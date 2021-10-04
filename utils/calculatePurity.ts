import { AxieGene } from 'agp-npm/dist/axie-gene';
import { Part, PartGene } from 'agp-npm/dist/models/part';
import { BreakdownPurity } from '../types/axies.types';
import { camelize } from './toCamelCase';

export function calculatePartPurity(
  part: PartGene | undefined,
  gene: Part,
) {
  let purity = 0;
  if (part) {
    if (camelize(part?.name) === camelize(gene.d.name)) { purity += 75; }
    if (camelize(part?.name) === camelize(gene.r1.name)) { purity += 18.75; }
    if (camelize(part?.name) === camelize(gene.r2.name)) { purity += 6.25; }
  }
  return purity;
}
export function calculatePartType(
  species: string[] | undefined,
  gene: Part,
) {
  let purity = 0;
  if (species?.includes(gene.d.name)) purity += 75;
  if (species?.includes(gene.r1.name)) purity += 18.75;
  if (species?.includes(gene.r2.name)) purity += 6.25;
  return purity;
}

export function calculatePurity(
  genes: AxieGene,
  parts: {
    Back?: PartGene;
    Mouth?: PartGene;
    Horn?: PartGene;
    Tail?: PartGene;
  },
  types?: {
    Eyes?: string[];
    Ears?: string[];
  },
) {
  const {
    Back, Mouth, Horn, Tail,
  } = parts;
  // eslint-disable-next-line max-len
  const partsQty = (Back ? 1 : 0) + (Mouth ? 1 : 0) + (Horn ? 1 : 0) + (Tail ? 1 : 0) + (types?.Eyes?.length || 0) + (types?.Ears?.length || 0);
  const backPurity = calculatePartPurity(Back, genes.back);
  const mouthPurity = calculatePartPurity(Mouth, genes.mouth);
  const hornPurity = calculatePartPurity(Horn, genes.horn);
  const tailPurity = calculatePartPurity(Tail, genes.tail);
  const earsPurity = types?.Ears ? calculatePartType(types.Ears, genes.ears) : 0;
  const eyesPurity = types?.Eyes ? calculatePartType(types.Eyes, genes.eyes) : 0;
  return (backPurity + mouthPurity + hornPurity + tailPurity + earsPurity + eyesPurity) / partsQty;
}

export function calculateBreakdownPurity(
  genes: AxieGene,
  parts: {
    Back?: PartGene;
    Mouth?: PartGene;
    Horn?: PartGene;
    Tail?: PartGene
  },
): BreakdownPurity {
  const {
    Back, Mouth, Horn, Tail,
  } = parts;
  const partsQty = (Back ? 1 : 0) + (Mouth ? 1 : 0) + (Horn ? 1 : 0) + (Tail ? 1 : 0);
  const backPurity = calculatePartPurity(Back, genes.back);
  const mouthPurity = calculatePartPurity(Mouth, genes.mouth);
  const hornPurity = calculatePartPurity(Horn, genes.horn);
  const tailPurity = calculatePartPurity(Tail, genes.tail);
  const purity = (backPurity + mouthPurity + hornPurity + tailPurity) / partsQty;
  return {
    back: backPurity, mouth: mouthPurity, horn: hornPurity, tail: tailPurity, purity,
  };
}

export default calculatePurity;
