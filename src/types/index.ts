export interface SourceRecord {
  source: string
  sourceId: string
  retrievedAt: string
  originalUrl: string
  scientificName: string
  dataset?: string
}

export interface OccurrenceRecord extends SourceRecord {
  country?: string
  region?: string
  locality?: string
  eventDate?: string
  basisOfRecord?: string
  institution?: string
  latitude?: number
  longitude?: number
}

export interface GeneticRecord extends SourceRecord {
  accession: string
  organism?: string
  marker?: string
  sequenceLength?: number
  publication?: string
  year?: string
}

export interface LiteratureRecord extends SourceRecord {
  title: string
  authors?: string
  year?: string
  journal?: string
  doi?: string
  pmid?: string
}

export interface TaxonomyRecord {
  rank: string
  name: string
  status: 'accepted' | 'synonym' | 'historical'
  source: string
  sourceId: string
  originalUrl: string
}
