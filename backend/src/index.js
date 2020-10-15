const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

function logRequests(req, res, next) {  
    const { method, url } = req;

    const logLabel = `[ ${method.toUpperCase()} | ${url} ]`;

    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
}

function verifyId(req, res, next) {

    const { id } = req.params;

    if (!isUuid(id)) {
        return res.json({ message: 'invalid project ID' });
    }

    return next();
}

app.use(logRequests);

const projects = [];

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.post('/projects', (req, res) => {

    const { title, owner } = req.body;

    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return res.json(project);

});

app.put('/projects/:id', verifyId, (req, res) => {

    const { id } = req.params;
    const { title, owner } = req.body;

    const findedId = projects.findIndex(item => item.id === id);

    const project = {
        id,
        title,
        owner
    }

    projects[findedId] = project;

    return res.json(project);

});

app.delete('/projects/:id', verifyId, (req, res) => {

    const { id } = req.params;

    const findedId = projects.findIndex(item => item.id === id);

    projects.splice(findedId);

    return res.send();

});

const server_port = 3333;
app.listen(server_port, () => {
    console.log(`🚀 server started on port:${server_port} 🚀`);
});