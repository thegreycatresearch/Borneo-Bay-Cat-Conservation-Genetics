import type { TaxonomyRecord } from '../types'

export const TAXONOMY_RECORDS: TaxonomyRecord[] = [
  { rank: 'species', name: 'Catopuma badia', status: 'accepted', source: 'GBIF backbone', sourceId: '2435098', originalUrl: 'https://www.gbif.org/species/2435098' },
  { rank: 'species', name: 'Pardofelis badia', status: 'historical', source: 'NCBI taxonomy', sourceId: '61454', originalUrl: 'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=61454' }
]

export function normalizeScientificName(name: string): string {
  return name.trim().toLowerCase() === 'pardofelis badia' ? 'Catopuma badia' : name.trim()
}