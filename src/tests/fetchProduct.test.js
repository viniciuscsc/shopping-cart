import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct com o argumento do produto "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561'); 
  });

  it('Retorna uma estrutura de dados igual ao objeto "product" com o argumento "MLB1405519561"', async () => {
    const response = await fetchProduct('MLB1405519561');
    expect(response).toEqual(product);
  });

  it('Retorna um erro com a mensagem "ID não informado" ao chamar a função sem argumento', async () => {
    try {
      await fetchProduct();
    }
    catch (error) {
      expect(error).toEqual(Error('ID não informado'));
    }
  });
});
