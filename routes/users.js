const usersRouter = require('express').Router();
const path = require('path');
const { getJsonFile } = require('../helpers/file-reader');

// роут на выгрузку данных юзера по айди
usersRouter.get('/users/:id', (req, res) => getJsonFile(path.join(__dirname, '..', 'data', 'users.json'))
  .then((data) => {
    if (!data) {
      res
        .status(500)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }

    const foundUser = data.find((user) => user._id === req.params.id);

    if (!foundUser) {
      res
        .status(404)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }

    res
      .status(200)
      .send(foundUser);
  }));

// роут на выгрузку данных всех юзеров
usersRouter.get('/users', (req, res) => getJsonFile(path.join(__dirname, '..', 'data', 'users.json'))
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
  usersRouter,
};
