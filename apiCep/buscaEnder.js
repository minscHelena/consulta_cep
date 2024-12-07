let main = document.querySelector("main");

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById('cidadeBusca').value = "";
    document.getElementById('ruaBusca').value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        // Atualiza os campos com os valores.
        let cep = conteudo.cep;
        let rua = conteudo.logradouro;
        let bairro = conteudo.bairro;
        let cidade = conteudo.localidade;
        let estado = conteudo.uf;
        let complemento = conteudo.complemento;

        let novoItem = `<div class="card border-info mb-3" style="max-width: 18rem;" id="frame">
          <div class="card-header"></div>
          <div class="card-body">
            <p class="card-text" id='BEcep'>${cep}</p>
            <p class="card-text" id='BErua'>${rua}</p>
            <p class="card-text" id='BEcomplemento'>${complemento}</p>
            <p class="card-text" id='BEbairro'>${bairro}</p>
            <p class="card-text" id='BEcidade'>${cidade}</p>
            <p class="card-text" id='BEuf'>${estado}</p>
          </div>
        </div>`;

        // Adiciona o novo item na página.
        main.innerHTML += novoItem;
    } else {
        // CEP não encontrado.
        limpa_formulário_cep();
        alert("Rua não encontrada.");
    }
}

function pesquisaEnder() {
    var cidade = document.getElementById('cidadeBusca').value;
    var rua = document.getElementById('ruaBusca').value;

    // Verifica se os campos rua e cidade estão preenchidos
    if (rua !== "" && cidade !== "") {

        // Preenche os campos com "..." enquanto consulta o webservice
        document.getElementById('rua').value = "...";
        document.getElementById('bairro').value = "...";
        document.getElementById('cidade').value = "...";
        document.getElementById('uf').value = "...";

        // Cria um elemento javascript.
        var script = document.createElement('script');

        // A URL da API do ViaCEP não funciona diretamente para buscar por rua e cidade.
        // A API do ViaCEP é mais indicada para consultar um CEP já conhecido.
        // Por isso, a URL correta aqui seria diferente e a busca por nome de rua não é suportada pelo ViaCEP.
        script.src = `https://viacep.com.br/ws/${cidade}/${rua}/json/?callback=meu_callback`;

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } else {
        // Caso os campos estejam vazios, limpa o formulário e exibe um alerta
        limpa_formulário_cep();
        alert("Por favor, digite a cidade e a rua.");
    }
};
