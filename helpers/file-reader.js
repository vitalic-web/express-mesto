const fsPromises = require('fs').promises;

// функция на чтение файла json
const getJsonFile = (filePath) =>
  fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then(data => JSON.parse(data))
    .catch(err => console.log(err));

module.exports = {
  getJsonFile: getJsonFile
}