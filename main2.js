const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const userListPath = path.join(__dirname, "userList.csv");

  // CSVファイルの読み込み
  fs.readFile(userListPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      return;
    }

    // CSVデータの処理（ヘッダーと選択肢の抽出）
    const rows = data.split("\n");
    const header = rows[0].split(",");
    const emailColumnIndex = header.indexOf("E-Mail");
    const nameColumnIndex = header.indexOf("社員名");
    const passColumnIndex = header.indexOf("受信メールパスワード");

    const emailOptions = rows.slice(1).map((row) => {
      const columns = row.split(",");
      const email = columns[emailColumnIndex];
      const name = columns[nameColumnIndex];
      const pass = columns[passColumnIndex];
      return { email, name, pass };
    });

    // レンダラープロセスにデータを送信
    mainWindow.webContents.once("dom-ready", () => {
      mainWindow.webContents.send("load-email-options", emailOptions);
    });

    // ウィンドウにHTMLを読み込ませる
    mainWindow.loadFile("index.html");
  });

  // ウィンドウが閉じられたときの処理
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
