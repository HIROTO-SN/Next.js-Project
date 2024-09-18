import fs from 'fs';
import path from 'path';

const logFilePath = "C:/Users/hirot/Desktop/PGM files/Practice/Next.js-Project/c-fancrew/src/log/";
const applogfile = "app.log";
const errorlogfile = "error.log";

export const ApplogToFile = (logData: string) => {
  const filepath = logFilePath + applogfile;
  const logDir = path.dirname(filepath);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logMessage = `${new Date().toISOString()} - ${logData}\n`;

  fs.appendFile(filepath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
};

export const ErrorlogToFile = (logData: string) => {
  const filepath = logFilePath + errorlogfile;
  const logDir = path.dirname(filepath);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logMessage = `${new Date().toISOString()} - ${logData}\n`;

  fs.appendFile(filepath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
};