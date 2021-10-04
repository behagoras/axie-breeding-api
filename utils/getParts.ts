import { PartGene } from 'agp-npm/dist/models/part'
interface Args {
  Back?: PartGene;
  Mouth?: PartGene;
  Horn?: PartGene;
  Tail?: PartGene;
}
export default function getParts ({ Back, Horn, Mouth, Tail }: Args):string[] {
  const parts = []
  if (Back) parts.push(`back-${Back.name}`)
  if (Horn) parts.push(`horn-${Horn.name}`)
  if (Mouth) parts.push(`mouth-${Mouth.name}`)
  if (Tail) parts.push(`tail-${Tail.name}`)
  return parts
}
