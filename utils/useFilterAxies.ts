import { Axie, GeneSearchProps } from '../types/axies.types';

const filterAxies = (axies: Axie[], values: GeneSearchProps) => axies.filter((axie) => {
  const priceEth = Math.floor((+axie.price / 1000000000000000000) * 1000) / 1000;
  const priceUsd = Math.floor(priceEth * 3337);
  const fromPrice = values.fromPrice ? +values.fromPrice < priceUsd : true;
  const toPrice = values.toPrice ? +values.toPrice > priceUsd : true;
  return fromPrice && toPrice;
}).sort((a, b) => b.purity - a.purity);


export default filterAxies