import { google } from "googleapis";
import fs from "fs";

// 設定憑證路徑（請替換成你的憑證 JSON 檔案路徑）
const credentialsPath = "./config/anime1-425404-15633838da0f.json";

// 設定試算表 ID 和範圍
const spreadsheetId = "130oBldhI4sqzNnQ0_xoByjPnZrrSv4Vve0zqU-T3_14";

// 讀取憑證檔案
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// 建立認證客戶端
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

// 建立 Sheets API 客戶端
const sheets = google.sheets({ version: "v4", auth });

const args = process.argv.slice(2);
const range =
  args.length > 0 && args[args.length - 2] !== ""
    ? args[args.length - 2]
    : "sheet";
const fileName =
  args.length > 0 && args[args.length - 1] !== ""
    ? args[args.length - 1]
    : "defaultName";
const filePath = "./src/translations/";

// 取得試算表資料;
sheets.spreadsheets.values.get(
  {
    spreadsheetId,
    range,
  },
  (err, res) => {
    if (err) {
      console.error("Error fetching data:", err);
      return;
    }
    const rows = res.data.values;
    if (rows.length) {
      let outputJsonArr = [];
      let langCount = rows[0].length;
      for (let j = 1; j < langCount; j++) {
        let outputJson = {};
        for (let i = 1; i < rows.length; i++) {
          outputJson[rows[i][0]] = rows[i][j];
        }
        outputJsonArr.push(outputJson);
      }

      for (let i = 1; i < langCount; i++) {
        const outputFilePath = `${filePath}${rows[0][i]}/${fileName}.json`;
        fs.writeFileSync(
          outputFilePath,
          JSON.stringify(outputJsonArr[i - 1], null, 2),
        );
      }
      console.log("Data export success");
    } else {
      console.log("No data found.");
    }
  },
);
