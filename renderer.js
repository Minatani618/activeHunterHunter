const { ipcRenderer } = require("electron");
const { webOperation } = require("./webOperation.js"); // alertHandler.jsから関数をインポート

ipcRenderer.on("load-email-options", (event, emailOptions) => {
  const dropdown = document.getElementById("dropdown");

  emailOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.email + "-----" + option.pass;
    optionElement.textContent = option.name;
    dropdown.appendChild(optionElement);
  });
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  const dropdown = document.getElementById("dropdown");
  const selectedValue = dropdown.value;
  webOperation(selectedValue); // showAlert 関数を呼び出す
});
