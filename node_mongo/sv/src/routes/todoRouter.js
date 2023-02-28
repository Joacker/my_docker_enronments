const express = require('express');
const todoController = require('../controllers/todoController');
const { isAuthenticated } = require('../middlewares');
const router = express.Router();

router.post('/',isAuthenticated, todoController.create);
router.get('/getTodos',isAuthenticated, todoController.getTodos);

module.exports = router;