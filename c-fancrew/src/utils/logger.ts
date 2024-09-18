import fs from 'fs';
import path from 'path';

const logFilePath = "C:/Users/hirot/Desktop/PGM files/Practice/Next.js-Project/c-fancrew/src/log";
const applogfile = "app.log";
const errorlogfile = "error.log";

/**
 * アプリログ出力
 * @param logData アプリログ内容
 */
export const ApplogToFile = (logData: string) => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const filepath = `${logFilePath}/${formattedDate}/${applogfile}`;
  const logDir = path.dirname(filepath);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // JST (UTC+9) HH:mm:ss に変換
  const jstTime = date.toLocaleTimeString('ja-JP', {
    hour12: false, 
    timeZone: 'Asia/Tokyo',
  });
  const logMessage = `${jstTime} - ${logData}\n`;

  fs.appendFile(filepath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
};

/**
 * エラーログ出力
 * @param logData エラーログ内容
 */
export const ErrorlogToFile = (logData: string) => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const filepath = `${logFilePath}/${formattedDate}/${errorlogfile}`;
  const logDir = path.dirname(filepath);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // JST (UTC+9) HH:mm:ss に変換
  const jstTime = date.toLocaleTimeString('ja-JP', {
    hour12: false, 
    timeZone: 'Asia/Tokyo',
  });
  const logMessage = `${jstTime} - ${logData}\n`;

  fs.appendFile(filepath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
};