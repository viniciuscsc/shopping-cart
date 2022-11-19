export const getAddress = async (cep) => {
  const urlCepAwesomeAPI = `https://cep.awesomeapi.com.br/json/${cep}`;
  const urlBrasilAPI = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const response = await Promise.any([
    await fetch(urlCepAwesomeAPI),
    await fetch(urlBrasilAPI),
  ]);
  const data = await response.json();

  const street = data.street || data.address;
  const district = data.neighborhood || data.district;
  const { city } = data;
  const { state } = data;
  return `${street} - ${district} - ${city} - ${state}`;
};

export const searchCep = () => {
  // seu código aqui
};
