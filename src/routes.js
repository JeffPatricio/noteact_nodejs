const express = require('express');
const path = require('path');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const NoteController = require('./controllers/NoteController');
const authMiddleware = require('./middlewares/auth');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'OK'
  })
});

routes.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

routes.use(authMiddleware);
routes.get('/users', UserController.read);
routes.put('/users', UserController.update);
routes.post('/notes', NoteController.create);
routes.get('/notes', NoteController.index);
routes.put('/notes', NoteController.update);
routes.delete('/notes/:id', NoteController.delete);


routes.use((error, req, res, next) => {
  console.log(error);
  return res.json({
    success: false,
    message: 'Erro interno no servidor'
  });
});

module.exports = routes;