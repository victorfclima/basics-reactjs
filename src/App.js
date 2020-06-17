import React from 'react';
import api from './services/api';
import './styles.css';
import { useEffect, useState } from 'react';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then(response => setRepositories(response.data));
	}, []);

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: `Desafio ReactJS: ${Date.now()}`,
			url: 'http://github.com/...',
			techs: ['Node.js', '...'],
		});

		const repository = response.data;
		setRepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`);

		const otherRepositories = repositories.filter(
			repository => repository.id !== id
		);

		setRepositories(otherRepositories);
	}

	return (
		<div>
			<ul data-testid='repository-list'>
				{repositories.map(repository => {
					return (
						<li key={repository.id}>
							{repository.title}
							<button onClick={() => handleRemoveRepository(repository.id)}>
								Remover
							</button>
						</li>
					);
				})}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
