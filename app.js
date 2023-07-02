// Lista de acordos
var acordos = [];

// Função para criar o HTML de um item de acordo promocional
function criarItemHTML(acordo) {
  var itemHTML = `
    <div class="acordo">
      <p><strong>Fornecedor:</strong> ${acordo.fornecedor}</p>
      <p><strong>Produto:</strong> ${acordo.produto}</p>
      <p><strong>Categoria:</strong> ${acordo.categoria}</p>
      <p><strong>Evento:</strong> ${acordo.evento}</p>
      <p><strong>Preço:</strong> ${acordo.preco}</p>
      <p><strong>Data:</strong> ${acordo.data}</p>
      <p><strong>Assinatura:</strong> ${acordo.assinatura}</p>
      <button class="excluir-btn">Excluir</button>
    </div>
  `;
  return itemHTML;
}

// Função para adicionar um novo acordo na lista
function adicionarAcordo(event) {
  event.preventDefault();

  // Obter os valores dos inputs
  var fornecedor = document.getElementById('fornecedor-input').value;
  var produto = document.getElementById('produto-input').value;
  var categoria = document.getElementById('categoria-input').value;
  var evento = document.getElementById('evento-input').value;
  var preco = document.getElementById('preco-input').value;
  var data = document.getElementById('data-input').value;
  var assinatura = document.getElementById('assinatura-input').value;

  // Criar o objeto de acordo
  var acordo = {
    fornecedor: fornecedor,
    produto: produto,
    categoria: categoria,
    evento: evento,
    preco: preco,
    data: data,
    assinatura: assinatura
  };

  // Adicionar o acordo na lista
  acordos.push(acordo);

  // Limpar os campos de input
  document.getElementById('fornecedor-input').value = '';
  document.getElementById('produto-input').value = '';
  document.getElementById('categoria-input').value = '';
  document.getElementById('evento-input').value = '';
  document.getElementById('preco-input').value = '';
  document.getElementById('data-input').value = '';
  document.getElementById('assinatura-input').value = '';

  // Atualizar a exibição da lista
  atualizarLista();
}

// Função para atualizar a exibição da lista de acordos
function atualizarLista() {
  var listaElement = document.getElementById('acordos-lista');
  listaElement.innerHTML = '';

  for (var i = 0; i < acordos.length; i++) {
    var acordo = acordos[i];
    var itemHTML = criarItemHTML(acordo);
    listaElement.innerHTML += itemHTML;
  }

  // Adicionar eventos de clique nos botões de exclusão
  var excluirBtns = document.getElementsByClassName('excluir-btn');
  for (var j = 0; j < excluirBtns.length; j++) {
    excluirBtns[j].addEventListener('click', excluirAcordo);
  }
}

// Função para excluir um acordo da lista
function excluirAcordo() {
  var acordoElement = this.parentNode;
  var index = Array.prototype.indexOf.call(acordoElement.parentNode.children, acordoElement);
  acordos.splice(index, 1);
  atualizarLista();
}

// Função para exportar a lista de acordos para um arquivo de texto (.txt)
function exportarLista() {
  var listaText = '';
  for (var i = 0; i < acordos.length; i++) {
    var acordo = acordos[i];
    listaText += 'Fornecedor: ' + acordo.fornecedor + '\n';
    listaText += 'Produto: ' + acordo.produto + '\n';
    listaText += 'Categoria: ' + acordo.categoria + '\n';
    listaText += 'Evento: ' + acordo.evento + '\n';
    listaText += 'Preço: ' + acordo.preco + '\n';
    listaText += 'Data: ' + acordo.data + '\n';
    listaText += 'Assinatura: ' + acordo.assinatura + '\n';
    listaText += '-------------------------\n';
  }

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(listaText));
  element.setAttribute('download', 'lista_acordos.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Evento de clique no botão de acesso à lista
var acessarListaBtn = document.getElementById('acessar-lista-btn');
acessarListaBtn.addEventListener('click', function() {
  var listaElement = document.getElementById('acordos-lista');
  if (listaElement.style.display === 'none') {
    listaElement.style.display = 'block';
    acessarListaBtn.textContent = 'Fechar Lista';
  } else {
    listaElement.style.display = 'none';
    acessarListaBtn.textContent = 'Acessar Lista';
  }
});

// Evento de submit do formulário de novo acordo
var novoAcordoForm = document.getElementById('novo-acordo-form');
novoAcordoForm.addEventListener('submit', adicionarAcordo);

// Evento de clique no botão de exportar lista
var exportarListaBtn = document.getElementById('exportar-lista-btn');
exportarListaBtn.addEventListener('click', exportarLista);
