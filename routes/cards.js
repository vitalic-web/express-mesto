const cardsRouter = require('express').Router();
const path = require('path');
const { getJsonFile } = require('../helpers/file-reader');

// роут на выгрузку данных карточек
cardsRouter.use('/cards', (req, res) => {
  return getJsonFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then(data => {
      if (!data) {
        res
          .status(500)
          .send(JSON.stringify({ "message": "Запрашиваемый ресурс не найден" }))
        return;
      }

      res
        .status(200)
        .send(data);
    })
})

module.exports = {
  cardsRouter: cardsRouter
}