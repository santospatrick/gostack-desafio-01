const express = require('express');

const server = express();

server.use(express.json())

const projects = [];

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    projects.push({id, title, tasks: []})

    res.json(projects)
})

server.get('/projects', (_req, res) => {
    res.json(projects)
})

server.put('/projects/:id', (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects[index].title = req.body.title

    res.json(projects)
})

server.delete('/projects/:id', (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects.splice(index, 1)

    res.send()
})

server.post('/projects/:id/tasks', (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects[index].tasks.push(req.body.title)

    res.send(projects)
})

server.listen(3000)