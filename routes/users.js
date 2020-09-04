const usersRouter = require('express').Router();
const path = require('path');
const { getJsonFile } = require('../helpers/file-reader');

// роут на выгрузку данных юзера по айди
usersRouter.use('/users/:id', (req, res) => {
  return getJsonFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then(data => {
      if (!data) {
        res
          .status(500)
          .send(JSON.stringify({ "message": "Запрашиваемый ресурс не найден" }))
        return;
      }

      const foundUser = data.find(user => user._id === req.params.id)

      if (!foundUser) {
        res
          .status(404)
          .send(JSON.stringify({ "message": "Запрашиваемый ресурс не найден" }))
      }

      res
        .status(200)
        .send(foundUser);
    })
});

// роут на выгрузку данных всех юзеров
usersRouter.use('/users', (req, res) => {
  return getJsonFile(path.join(__dirname, '..', 'data', 'users.json'))
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
  usersRouter: usersRouter
}

