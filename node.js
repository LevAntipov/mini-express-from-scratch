const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");

fs.writeFile(path.resolve(__dirname, "newFile"), "1 2 3 4 5", (err) => {
  try {
    if (err) throw err;
  } catch (err) {
    console.log(err);
  }
});

function asyncWriteFile(path, text) {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, text, (err) => {
      try {
        if (err) throw err;
        resolve();
      } catch (err) {
        console.log(err);
      }
    })
  );
}

asyncWriteFile(path.resolve(__dirname, "qwe"), "123").then(() =>
  asyncWriteFile(path.resolve(__dirname, "qwe"), "456")
);
