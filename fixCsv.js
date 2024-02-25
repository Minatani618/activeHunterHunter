const fs = require("fs");
const path = require("path");

// csv モジュールの内，必要な機能を読み込む
const csv = require("csv-parse/sync");
const stringify = require("csv-stringify/sync");
const { userInfo } = require("os");

const childItems = fs.readdirSync(__dirname);
let targetCsvFile;
for (let i = 0; i < childItems.length; i++) {
  if (
    childItems[i].startsWith("ユーザー情報") &&
    childItems[i].endsWith("csv")
  ) {
    targetCsvFile = childItems[i];
    break;
  }
}

// csvファイルを読み込む
const inputData = fs.readFileSync(targetCsvFile, { encoding: "utf8" });

const csvData = csv.parse(inputData, { encoding: "utf-8", columns: true });
let data = [];

const extract = (kana) => {
  for (let i = 0; i < csvData.length; i++) {
    if (csvData[i]["姓(ふりがな)"].startsWith(kana)) {
      const str = `${csvData[i]["社員番号"]},${csvData[i]["メールアドレス(ドメイン)"]},${csvData[i]["メールアドレスPW"]},,${csvData[i]["氏名"]},${csvData[i]["姓(ふりがな)"]}`;
      data.push(str);
    }
  }
};

data.push("ログイン名,E-Mail,受信メールパスワード,,社員名,よみ");

data.push(",,,,★★★あ★★★,あ");
extract("あ");
extract("い");
extract("う");
extract("え");
extract("お");

data.push(",,,,★★★か★★★,か");
extract("か");
extract("き");
extract("く");
extract("け");
extract("こ");
extract("が");
extract("ぎ");
extract("ぐ");
extract("げ");
extract("ご");

data.push(",,,,★★★さ★★★,さ");
extract("さ");
extract("し");
extract("す");
extract("せ");
extract("そ");
extract("ざ");
extract("じ");
extract("ず");
extract("ぜ");
extract("ぞ");

data.push(",,,,★★★た★★★,た");
extract("た");
extract("ち");
extract("つ");
extract("て");
extract("と");
extract("だ");
extract("ぢ");
extract("づ");
extract("で");
extract("ど");

data.push(",,,,★★★な★★★,な");
extract("な");
extract("に");
extract("ぬ");
extract("ね");
extract("の");

data.push(",,,,★★★は★★★,は");
extract("は");
extract("ひ");
extract("ふ");
extract("へ");
extract("ほ");
extract("ば");
extract("び");
extract("ぶ");
extract("べ");
extract("ぼ");
extract("ぱ");
extract("ぴ");
extract("ぷ");
extract("ぺ");
extract("ぽ");

data.push(",,,,★★★ま★★★,ま");
extract("ま");
extract("み");
extract("む");
extract("め");
extract("も");

data.push(",,,,★★★や★★★,や");
extract("や");
extract("ゆ");
extract("よ");

data.push(",,,,★★★ら★★★,ら");
extract("ら");
extract("り");
extract("る");
extract("れ");
extract("ろ");

data.push(",,,,★★★わ★★★,わ");
extract("わ");
extract("を");

let dataStr = "";
data.forEach((d) => (dataStr += `${d}\n`));
fs.writeFileSync(path.join(__dirname, "users.csv"), dataStr);
