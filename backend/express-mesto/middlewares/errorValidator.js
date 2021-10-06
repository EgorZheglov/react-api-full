/* eslint-disable linebreak-style */
module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  if (err.message === 'Сервер сейчас упадёт') {
    res.status(500).send({ message: 'Crash-test succsesfull ;)' });
  }

  res.status(500).send({ message: 'Ошибка работы сервера' });
  next();
};
