const { ipcRenderer } = require("electron");
const { webOperation } = require("./webOperation.js"); // alertHandler.jsから関数をインポート

ipcRenderer.on("load-email-items", (event, emailItems) => {
  const dropdown = document.getElementById("dropdown");

  emailItems.forEach((item) => {
    const itemElement = document.createElement("option");
    const itemValue= `${item.email}-----${item.pass}`.replace(/"/g,"");
    const itemText =item.name.replace(/"/g,"")
    itemElement.value = itemValue
    itemElement.textContent = itemText
    dropdown.appendChild(itemElement);
  });
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  const dropdown = document.getElementById("dropdown");
  const selectedValue = dropdown.value;
  webOperation(selectedValue); // showAlert 関数を呼び出す
});
