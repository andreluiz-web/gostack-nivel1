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
        
        const data = {
            title: `novo projeto ${Date.now()}`,
            owner: 'andre luiz'
        };

        const response = await api.post('/projects', data);

        setProjects([...projects, response]);
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
