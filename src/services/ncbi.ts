import type { GeneticRecord } from '../types'
import { getJson } from './http'

interface ESearchResponse { esearchresult: { idlist: string[] } }

export async function fetchGeneticRecords(): Promise<GeneticRecord[]> {
  const term = encodeURIComponent('Catopuma badia[Organism] OR Pardofelis badia[Organism]')
  const search = await getJson<ESearchResponse>(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=nuccore&retmode=json&retmax=25&term=${term}`)
  return search.esearchresult.idlist.map((id) => ({
    source: 'NCBI / GenBank', sourceId: id, accession: id, retrievedAt: new Date().toISOString(),
    originalUrl: `https://www.ncbi.nlm.nih.gov/nuccore/${id}`, scientificName: 'Catopuma badia'
  }))
}
