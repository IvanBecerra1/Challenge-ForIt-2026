const express = require('express');
//const {v4 : uuid4 } = require('uuid'); 
const crypto = require('crypto');
const router = express.Router();

/**
 * Implementar los siguientes endpoints:
○ GET /api/tasks - Obtener todas las tareas
○ POST /api/tasks - Crear una nueva tarea
○ PUT /api/tasks/:id - Actualizar una tarea existente
○ DELETE /api/tasks/:id - Eliminar una tarea

**/

const tasks = require('../model/task');
const task = require('../model/task');

const getAllTask = (request, response) => {
    response.json(tasks);
}

const createTask = (request, response) => {
    const { title, description } = request.body;

    if (!title) {
        return response.status(400).json({ error : 'El titulo no puede estar vacio'});
    }

    const createTask = {
        id : crypto.randomUUID(),
        title,
        description: description || '',
        completed: false,
        createdAt: new Date()
    };

    tasks.push(createTask);
    response.status(201).json(createTask);
}

const updateTask = (request, response) => {
    const id = tasks.findIndex(task => task.id === request.params.id);

    if (id === -1) {
        return response.status(404).json({ error : "No se encontro la tarea"});
    }
    const { title, description, completed } = request.body;

    if (title !== undefined) tasks[id].title = title;
    if (description !== undefined) tasks[id].description = description;
    if (completed !== undefined) tasks[id].completed = completed;

    response.json(tasks[id]);
}
const deleteTask = (request, response) => {
    const id = tasks.findIndex(task => task.id === request.params.id);

    if (id === -1)
        return response.status(404).json({error : "No se encontro la ID para borrar"});

    task.splice(id, 1);

    response.status(204).json({message: "Elemento borrado exitosamente."});
}

module.exports = { getAllTask, createTask, updateTask, deleteTask };