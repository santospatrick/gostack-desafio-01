const express = require('express');

const server = express();

server.use(express.json())

const projects = [];
let requests = 0;

server.use((_req, _res, next) => {
    requests += 1;
    
    console.log('Requisições: ', requests)
    next();
})

function projectExists(req, res, next) {
    if (!projects.some(item => item.id == req.params.id)) {
        return res.status(400).json({ error: 'Project not found' })
    }

    return next()
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    projects.push({id, title, tasks: []})

    res.json(projects)
})

server.get('/projects', (_req, res) => {
    res.json(projects)
})

server.put('/projects/:id', projectExists, (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects[index].title = req.body.title

    res.json(projects)
})

server.delete('/projects/:id', projectExists, (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects.splice(index, 1)

    res.send()
})

server.post('/projects/:id/tasks', projectExists, (req, res) => {
    const index = projects.findIndex(item => item.id == req.params.id)

    projects[index].tasks.push(req.body.title)

    res.send(projects)
})

server.listen(3000)