import { PartGene } from 'agp-npm/dist/models/part';
interface Args {
  Back?: PartGene|PartGene[];
  Mouth?: PartGene|PartGene[];
  Horn?: PartGene|PartGene[];
  Tail?: PartGene|PartGene[];
}
export default function getParts({Back,Horn,Mouth,Tail}: Args): string[] {
  const parts = [];
  if (Back) {
    if(Array.isArray(Back)) {
      Back.forEach((part) => {
        parts.push(part);
      });
    }
    else parts.push(`back-${Back.name}`);
  }
  if (Horn) {
    if(Array.isArray(Horn)) {
      Horn.forEach((part) => {
        parts.push(part);
      });
    }
    else parts.push(`horn-${Horn.name}`);
  }
  if (Mouth) {
    if(Array.isArray(Mouth)) {
      Mouth.forEach((part) => {
        parts.push(part);
      });
    }
    else parts.push(`mouth-${Mouth.name}`);
  }
  if (Tail) {
    if(Array.isArray(Tail)) {
      Tail.forEach((part) => {
        parts.push(part);
      });
    }
    else parts.push(`tail-${Tail.name}`);
  }
  return parts;
}
