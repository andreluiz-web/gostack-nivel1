import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';

    function App() {

    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {

        const response = await api.post('/projects', {
            title: `novo projeto ${Date.now()}`,
            owner: 'andre luiz'
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
         <Header />
         <ul>
            {projects.map(item => <li>{item.title}</li>)}
         </ul>
         <button onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}
 
export default App;