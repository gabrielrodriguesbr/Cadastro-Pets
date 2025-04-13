// script.js
document.getElementById("petForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const idade = document.getElementById("idade").value;
  
    if (nome && tipo && idade) {
      // Recuperar os dados do localStorage ou inicializar uma lista
      const pets = JSON.parse(localStorage.getItem("pets")) || [];
  
      // Adicionar novo animal
      pets.push({ nome, tipo, idade });
      localStorage.setItem("pets", JSON.stringify(pets));
  
      // Atualizar tabela
      atualizarTabela();
      document.getElementById("petForm").reset();
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  });
  
  function atualizarTabela() {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const petTableBody = document.getElementById("petTableBody");
    petTableBody.innerHTML = "";
  
    pets.forEach((pet, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pet.nome}</td>
        <td>${pet.tipo}</td>
        <td>${pet.idade} anos</td>
        <td>
          <button class="action-button" onclick="editarPet(${index})">Editar</button>
          <button class="delete-button" onclick="excluirPet(${index})">Excluir</button>
        </td>
      `;
      petTableBody.appendChild(row);
    });
  }
  
  function excluirPet(index) {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.splice(index, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    atualizarTabela();
  }
  
  function editarPet(index) {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const pet = pets[index];
  
    // Preencher o formulário com os dados existentes
    document.getElementById("nome").value = pet.nome;
    document.getElementById("tipo").value = pet.tipo;
    document.getElementById("idade").value = pet.idade;
  
    // Remover o pet da lista temporariamente
    pets.splice(index, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    atualizarTabela();
  }
  
  // Atualizar tabela ao carregar a página
  document.addEventListener("DOMContentLoaded", atualizarTabela);
  