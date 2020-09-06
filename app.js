const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cardsRouter); // использование роута карточек
app.use(usersRouter); // использование роута юзеров и юзера по айди

// обработка несуществующего адреса
app.use('/*', (req, res) => res
  .status(404)
  .send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
