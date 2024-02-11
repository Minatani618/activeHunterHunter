const csv = require("csv-parse");
const data = csv.parse("ユーザー情報_20240201T085532+0900.csv");
console.log(data.state);
