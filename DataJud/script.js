function consultarProcesso() {
    const numeroProcesso = document.getElementById('numeroProcesso').value;
    if (!numeroProcesso) {
        alert('Por favor, insira o número do processo.');
        return;
    }
    const url = `http://localhost:8080/processos?numeroProcesso=${numeroProcesso}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const processo = data.hits.hits[0]._source;
            displayProcesso(processo);
            displayMovimentos(processo.movimentos, 1); // Exibe a primeira página dos movimentos
        })
        .catch(error => {
            console.error('Erro:', error);
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `<h2>Erro ao consultar processo</h2><pre>${error}</pre>`;
        });
}

function displayProcesso(processo) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Resultado da Consulta</h2>
        <table>
            <tr>
                <th>Número do Processo</th>
                <td>${processo.numeroProcesso}</td>
            </tr>
            <tr>
                <th>Tribunal</th>
                <td>${processo.tribunal}</td>
            </tr>
            <tr>
                <th>Classe</th>
                <td>${processo.classe.nome}</td>
            </tr>
            <tr>
                <th>Grau</th>
                <td>${processo.grau}</td>
            </tr>
            <tr>
                <th>Formato</th>
                <td>${processo.formato.nome}</td>
            </tr>
            <tr>
                <th>Data de Ajuizamento</th>
                <td>${new Date(processo.dataAjuizamento).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Última Atualização</th>
                <td>${new Date(processo.dataHoraUltimaAtualizacao).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Órgão Julgador</th>
                <td>${processo.orgaoJulgador.nome}</td>
            </tr>
            <tr>
                <th>Nível de Sigilo</th>
                <td>${processo.nivelSigilo}</td>
            </tr>
        </table>
        <h3>Assuntos</h3>
        <ul>
            ${processo.assuntos.map(assunto => `<li>${assunto.nome}</li>`).join('')}
        </ul>
        <h3>Movimentos</h3>
        <div id="movimentosContainer"></div>
        <div class="pagination" id="pagination"></div>
    `;
}

function displayMovimentos(movimentos, currentPage) {
    // Inverte a lista de movimentos para exibir do mais recente ao mais antigo
    const movimentosInvertidos = movimentos.slice().reverse();

    const movimentosContainer = document.getElementById('movimentosContainer');
    const paginationDiv = document.getElementById('pagination');
    const itemsPerPage = 10;
    const totalPages = Math.ceil(movimentosInvertidos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovimentos = movimentosInvertidos.slice(startIndex, endIndex);

    movimentosContainer.innerHTML = `
        <table>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Data e Hora</th>
            </tr>
            ${currentMovimentos.map(movimento => `
                <tr>
                    <td>${movimento.codigo}</td>
                    <td>${movimento.nome}</td>
                    <td>${new Date(movimento.dataHora).toLocaleString()}</td>
                </tr>
            `).join('')}
        </table>
    `;

    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = function() {
            displayMovimentos(movimentosInvertidos, i);
        };
        paginationDiv.appendChild(button);
    }
}

