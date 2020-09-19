const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3001 } = process.env;
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json()); // метод для парсинга req.body

// временный способ авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '5f63c69ce5d1e019145997d3',
  };

  next();
});

app.use(cardsRouter); // использование роута карточек
app.use(usersRouter); // использование роута юзеров и юзера по айди

// обработка несуществующего адреса
app.use('*', (req, res) => res
  .status(404)
  .send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
