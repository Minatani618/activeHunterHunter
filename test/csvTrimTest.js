const fs = require("fs");
const csvParser = require("csv-parser");

const rs = fs.createReadStream("users.csv");
rs.pipe(csvParser()).on("data", (data) => {
  console.log(data[("氏名", "メールアドレス(ドメイン)")]);
});
