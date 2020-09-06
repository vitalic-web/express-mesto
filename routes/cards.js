const cardsRouter = require('express').Router();
const path = require('path');
const { getJsonFile } = require('../helpers/file-reader');

// роут на выгрузку данных карточек
cardsRouter.get('/cards', (req, res) => getJsonFile(path.join(__dirname, '..', 'data', 'cards.json'))
  .then((data) => {
    if (!data) {
      res
        .status(500)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }

    res
      .status(200)
      .send(data);
  }));

module.exports = {
  cardsRouter,
};
