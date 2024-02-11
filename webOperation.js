function webOperation(selectedValue) {
  const puppeteer = require("puppeteer");
  const id = selectedValue.split("-----")[0];
  const pass = selectedValue.split("-----")[1];

  const openActiveHunter = async (id, pass) => {
    // Puppeteerの初期化
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      headless: false,
    });
    const page = await browser.newPage();

    // アクティブハンターを表示
    await page.goto(
      "https://wxa107.wadax-sv.jp/hunter/pc.igm/login?context=custom_button_5"
    );

    // ログイン情報を入力
    await page.waitForSelector("#u_pass");
    await page.type("#u_id", id);
    await page.type("#u_pass", pass);
  };
  openActiveHunter(id, pass);
}

module.exports = {
  webOperation,
};
