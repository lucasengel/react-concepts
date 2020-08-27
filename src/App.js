import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  const handleAddRepository = async () => {
    const randomNumber = Math.ceil(Math.random() * 100);

    const response = await api.post("repositories", {
      title: `Repository ${randomNumber}`,
      url: `https://github.com/lucasengel/repo${randomNumber}`,
      techs: ["React", "Node", "MongoDB"],
    });

    setRepositories([...repositories, response.data]);
  };

  const handleRemoveRepository = async (id) => {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
