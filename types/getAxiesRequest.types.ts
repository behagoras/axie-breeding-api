import { PartGene } from 'agp-npm/dist/models/part'
import { Axie } from './axies.types'

export interface PartsAndSpecies {
  Back?: PartGene ;
  Mouth?: PartGene ;
  Horn?: PartGene ;
  Tail?: PartGene ;
  species?: string[];
}

export type GetAxiesRequest = (include: PartsAndSpecies, parts:PartsAndSpecies, omit?: PartsAndSpecies | undefined)=>Promise<Axie[]>;
