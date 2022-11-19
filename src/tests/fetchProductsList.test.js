import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Retorna uma estrutura de dados igual ao objeto "computadorSearch" com o argumento "computador"', async () => {
    const response = await fetchProductsList('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Retorna um erro com a mensagem "Termo de busca não informado" ao chamar a função sem argumento', async () => {
    try {
      await fetchProductsList();
    }
    catch (error) {
      expect(error).toEqual(Error('Termo de busca não informado'));
    }
  });
});
