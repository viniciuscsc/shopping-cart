import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

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

// criar função para retirar o texto 'carregando' depois do carregamento dos produtos na tela
const removeLoadingMessage = () => {
  const loadingMessage = document.querySelector('.loading');
  productsSection.removeChild(loadingMessage);
};

const displaysErrorMessage = () => {
  const errorMessage = document.createElement('span');
  errorMessage.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorMessage.classList.add('error');
  productsSection.appendChild(errorMessage);
};

// para cada produto da lista, adiciona o produto, formatado pela função createProductElement, ao html
const getProductsList = async () => {
  try {
    const productsList = await fetchProductsList('computador');
    productsList.forEach((product) => {
      productsSection.appendChild(createProductElement(product));
    });
  } catch {
    displaysErrorMessage();
  } finally {
    removeLoadingMessage();
  }
};
getProductsList();

const cartProducts = document.querySelector('ol');

const savedCartIDs = getSavedCartIDs();
savedCartIDs.forEach(async (savedCartId) => {
  const productDetails = await fetchProduct(savedCartId);
  const product = createCartProductElement(productDetails);
  cartProducts.appendChild(product);
});

const totalPrice = document.querySelector('.total-price');
const totalPriceValue = localStorage.getItem('totalPrice');
totalPrice.innerText = totalPriceValue;

document.querySelector('.cep-button').addEventListener('click', searchCep);
