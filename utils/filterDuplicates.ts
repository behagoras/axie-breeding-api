import { Axie } from '../types/axies.types';

export default function filterDuplicates(axies:Axie[]) {
  return axies.filter((axie, index, arr) => {
    return arr.findIndex(a => a.id === axie.id) === index
  })
}
