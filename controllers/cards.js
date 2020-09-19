const Card = require('../models/cards');

// выгрузка всех карточек
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// создание карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 400;
      const ERROR_CODE_SERVER = 500;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      } return res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

// удаление карточки по id
const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 404;
      const ERROR_CODE_SERVER = 500;

      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Карточка не найдена' });
      } return res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
