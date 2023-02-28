const express = require('express');
const todoController = require('../controllers/todoController');
const { isAuthenticated } = require('../middlewares');
const router = express.Router();

router.post('/',isAuthenticated, todoController.create);
router.get('/getTodos', isAuthenticated, todoController.getTodos);
router.get('/getTodo/:id',isAuthenticated, todoController.getTodo);
router.put('/updateTodo/:id',isAuthenticated, todoController.updateTodo);
router.delete('/deleteTodo/:id',isAuthenticated, todoController.deleteTodo);

module.exports = router;