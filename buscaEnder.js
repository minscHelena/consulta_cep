function consultar(event){
    event.preventDefault();

    const tbody = document.querySelector('#lista tbody');
    tbody.innerHTML = ''; //limpa o tbody a cada nova consulta para não sobrescrever

    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const uf = document.getElementById('uf').value;

    const button = document.querySelector('button');
    button.disabled = true;
    button.textContent = 'Consultando...';

    fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`)
        .then(response => response.json())
        .then(data => {
            data.forEach(endereco => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = endereco.cep;
                row.insertCell(1).textContent = endereco.logradouro;
                row.insertCell(2).textContent = endereco.bairro;
                row.insertCell(3).textContent = endereco.complemento;
            });
        })
        .catch(error =>{ //para caso a api esteja fora do ar
            console.error(error);
            alert('Não foi possível realizar sua consulta. Tente novamente mais tarde.')
        })
        .finally(() =>{
            button.disabled = false;
            button.textContent = 'Consultar';

        })
}