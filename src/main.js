import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// cria variável para a section de produtos
const productsSection = document.querySelector('.products');

// criar função para exibir o texto 'carregando' antes do carregamento dos produtos na tela
const displaysLoadingMessage = () => {
  const loadingMessage = document.createElement('span');
  loadingMessage.innerText = 'carregando...';
  loadingMessage.classList.add('loading');
  productsSection.appendChild(loadingMessage);
};
displaysLoadingMessage();

// cria o array com a lista de produtos importada da API
const productsList = await fetchProductsList('computador');

// para cada produto da lista, adiciona o produto, formatado pela função createProductElement, ao html
productsList.forEach((product) => {
  productsSection.appendChild(createProductElement(product));
});

// criar função para retirar o texto 'carregando' depois do carregamento dos produtos na tela
const removeLoadingMessage = () => {
  const loadingMessage = document.querySelector('.loading');
  productsSection.removeChild(loadingMessage);
};
removeLoadingMessage();
