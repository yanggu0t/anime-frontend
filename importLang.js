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
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
// 建立 Sheets API 客戶端
const sheets = google.sheets({ version: "v4", auth });

// 指定檔案路徑
const args = process.argv.slice(2);
const range =
  args.length > 0 && args[args.length - 2] !== ""
    ? args[args.length - 2]
    : "sheet";
const fileName =
  args.length > 0 && args[args.length - 1] !== ""
    ? args[args.length - 1]
    : "defaultName";

const filePath = "./src/global/locales/";
const langArr = ["zh", "eng", "jp"];

const readJsonFromLocalPath = async (path) => {
  try {
    // 讀取檔案
    const data = await fs.promises.readFile(path, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("讀取檔案時發生錯誤：", err);
    throw err; // 或者根據你的需求處理錯誤
  }
};

let writeValue = [];
let jsonFromFile = [];
let rawOnw = [...langArr];
rawOnw.unshift("key");
writeValue.push(rawOnw);

const setJsonFromFile = () => {
  langArr.map((item) => {
    const path = filePath + item + "/" + fileName + ".json";
    const jsonData = readJsonFromLocalPath(path);
    jsonFromFile.push(jsonData);
  });
};

setJsonFromFile();
Promise.all(jsonFromFile).then((values) => {
  const keys = Object.keys(values[0]);
  keys.map((key) => {
    let rawItem = [key];
    for (let i = 0; i < langArr.length; i++) {
      rawItem.push(values[i][key]);
    }
    writeValue.push(rawItem);
  });

  // 新增工作表
  sheets.spreadsheets.batchUpdate(
    {
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: range,
              },
            },
          },
        ],
      },
    },
    (err, response) => {
      if (err) {
        console.error("新增工作表時發生錯誤：", err);
        return;
      }
      console.log("工作表已成功新增！");
      // 取得試算表資料;
      sheets.spreadsheets.values.update(
        {
          spreadsheetId,
          range: range,
          valueInputOption: "RAW",
          resource: {
            values: writeValue,
          },
        },
        (err, res) => {
          if (err) {
            console.error("Error fetching data:", err);
            return;
          }
          console.log("更新成功");
        },
      );
    },
  );
});
