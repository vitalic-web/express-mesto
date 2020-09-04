const express = require('express');
const path = require('path');
const app = express();
const { PORT = 3000 } = process.env;
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cardsRouter); // использование роута карточек
app.use(usersRouter); // использование роута юзеров и юзера по айди

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})