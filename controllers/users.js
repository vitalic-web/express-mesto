const User = require('../models/users');

// выгрузка всех юзеров
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// создание юзера
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      const ERROR_CODE_SERVER = 500;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      } return res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

// поиск юзера по id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 404;
      const ERROR_CODE_SERVER = 500;

      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Пользователь не найден' });
      } return res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновление профиля
const updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// обновление аватара
const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
