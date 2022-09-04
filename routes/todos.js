var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const todos = [{ id: 1, name: "Do something", completed: false }]

/* To dos*/
router.get('/', function (req, res, next) {
    res.json(todos)
});

router.get("/:id", (req, res, next) => {
    const Foundtodo = todos.find(todo => todo.id === Number(req.params.id))
    if (Foundtodo) {
        res.json({ id: 1, name: "to do", completed: false })
    }
    else {
        return next(createError(404, "Not Found"))
    }

})

router.post("/", (res, req, next) => {
    const { body } = req;
    
    if (typeof body.name !== 'string') {
        return next(createError(422, "Validation Error"))
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})
module.exports = router;
