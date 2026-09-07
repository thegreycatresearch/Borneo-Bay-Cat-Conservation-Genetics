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
  countryCode?: string
  region?: string
  locality?: string
  acceptedScientificName?: string
  taxonomicRank?: string
  kingdom?: string
  phylum?: string
  className?: string
  order?: string
  family?: string
  genus?: string
  species?: string
  eventDate?: string
  basisOfRecord?: string
  occurrenceStatus?: string
  institution?: string
  collection?: string
  datasetKey?: string
  publishingOrganization?: string
  license?: string
  recordedBy?: string
  latitude?: number
  longitude?: number
}

export interface GeneticRecord extends SourceRecord {
  accession: string
  organism?: string
  molecule?: string
  marker?: string
  sequenceLength?: number
  gene?: string
  collectionDate?: string
  geographicLocation?: string
  publication?: string
  bioProject?: string
  bioSample?: string
  database?: string
  year?: string
  genes?: GeneRecord[]
  sequence?: string
}

export interface GeneRecord {
  geneName: string
  originalName?: string
  marker?: string
  accession: string
  organism?: string
  molecule?: string
  sequenceLength?: number
  collectionDate?: string
  country?: string
  geographicLocation?: string
  specimenVoucher?: string
  bioSample?: string
  bioProject?: string
  publication?: string
  source: string
  sourceUrl: string
  sourceId: string
  retrievedAt: string
}

export interface BoldRecord extends SourceRecord {
  specimenId?: string
  processId?: string
  marker?: string
  country?: string
  collectionInformation?: string
  sequenceAvailable?: boolean
}

export interface OccurrenceQuery {
  scientificName?: string
  limit?: number
  offset?: number
}

export interface OccurrenceQueryResult {
  records: OccurrenceRecord[]
  count: number
  limit: number
  offset: number
}

export interface GeneticQueryResult {
  records: GeneticRecord[]
  count: number
  limit: number
  offset: number
}

export interface LiteratureRecord extends SourceRecord {
  title: string
  authors?: string
  year?: string
  journal?: string
  doi?: string
  pmid?: string
  abstractAvailable?: boolean
}

export interface EnrichedValue<T> {
  value: T | null
  source: string
  sourceId: string
  sourceUrl: string
  retrievedAt: string
  confidence: 'direct' | 'linked' | 'derived' | 'unknown'
}

export interface EnrichedScientificRecord {
  original: SourceRecord
  fields: Record<string, EnrichedValue<unknown>>
}

export interface TaxonomyRecord {
  rank: string
  name: string
  status: 'accepted' | 'synonym' | 'historical'
  source: string
  sourceId: string
  originalUrl: string
}
