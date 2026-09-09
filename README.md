# Borneo Bay Cat Conservation & Genetics

**An open research and conservation data explorer for _Catopuma badia_.**

This static React + TypeScript + Vite site brings together public biodiversity, molecular, taxonomic, literature and conservation sources. It is an exploratory research tool, not an official database or conservation assessment.

## Final implementation

- Spanish-first bilingual interface with English switch, persisted in `localStorage`.
- Routes for Home, Species Profile, Genetics, Distribution, Taxonomy, Research, Conservation, Data Explorer, Data Availability, Sources and Methodology.
- GBIF Occurrence API search for `Catopuma badia` and `Pardofelis badia`, with normalized metadata, coordinate validation, filters, bounded result loading and pagination.
- NCBI E-utilities `esearch.fcgi`, `esummary.fcgi` and on-demand `efetch.fcgi` adapters for GenBank/Nuccore metadata, features and public sequences, with pagination, rate limiting and accession links.
- PubMed E-utilities metadata search for related publications.
- Crossref public metadata search and Dryad public dataset search for related research records.
- Genetics dashboard metrics, gene/marker extraction, on-demand sequence viewer, clipboard copy and FASTA download.
- CSV/JSON/FASTA export helpers, central provenance-aware data enrichment and dynamic Data Availability summary.
- A reusable Leaflet map for validated GBIF records and source-linked popups.
- Provenance-aware TypeScript records and a GitHub Pages workflow.
- Session and memory cache, timeout handling, loading/empty/error states and retry buttons.
- No API keys, private credentials, aggressive scraping or inferred population genetic statistics.

BOLD has an explicit adapter, but its public endpoints returned `403` Cloudflare or `404` in the checks performed on 2026-09-09. No restriction is bypassed; the UI reports BOLD as unavailable when the provider blocks direct browser access. Dryad's API returned valid JSON but no browser CORS header in the same checks. Authorized server-side proxies can be configured with `VITE_BOLD_PROXY_URL` and `VITE_DRYAD_PROXY_URL` (see `.env.example`).

## Architecture

Reusable UI lives in `src/components`; public API adapters live in `src/services`; data contracts are in `src/types`; translation catalogs are in `src/i18n/es` and `src/i18n/en`; `src/hooks` contains request state handling; route-level views currently live in `src/App.tsx`.

## Local development

```bash
npm install
npm run dev
```

Validation and production build:

```bash
npm run lint
npm test
npm run build
```

## GitHub Pages

The included `.github/workflows/deploy.yml` installs dependencies, runs lint, tests and build, then publishes `dist` with the official Pages actions. Enable **Settings > Pages > Source: GitHub Actions** in the repository. Vite uses a relative base path, so the workflow works regardless of the repository name.

## Data Sources

- [GBIF](https://www.gbif.org/), [Occurrence API documentation](https://techdocs.gbif.org/openapi/occurrence#/Searching%20occurrences/searchOccurrences): occurrence metadata and coordinates. No authentication. Results are limited to 100 per client query and cached in memory/session storage.
- [NCBI / GenBank](https://www.ncbi.nlm.nih.gov/), [E-utilities documentation](https://www.ncbi.nlm.nih.gov/books/NBK25501/): public Nuccore search and summaries. No API key is used; requests are paginated, cached and spaced.
- [BOLD Systems](https://www.boldsystems.org/): DNA barcodes. The adapter attempts the public endpoint; provider-level Cloudflare/CORS blocking may require an authorized proxy configured with `VITE_BOLD_PROXY_URL`.
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [Crossref](https://www.crossref.org/): public publication metadata connected through E-utilities and the Crossref API.
- [Dryad](https://datadryad.org/): public research datasets queried through its public API; browser deployment may require `VITE_DRYAD_PROXY_URL` because the provider does not currently return CORS headers.
- [Cat Specialist Group](https://www.catsg.org/): conservation context and external links without a private IUCN API dependency.

All returned records preserve `source`, `sourceId`, `retrievedAt`, `originalUrl` and the source scientific name. Source-derived scientific content is not translated.

## Scientific limits

Counts in the interface are only populated from records actually returned by a source. A missing result does not demonstrate species absence. Small sequence collections cannot support population-level diversity claims.

External records can change, contain duplicates, omit coordinates or omit genetic metadata. GBIF coordinates are never geocoded or altered; invalid coordinates are excluded from the map. Counts and filters are derived from observed API responses. Interpretation and unknowns are kept separate from those observations.

## Analysis boundary

The application deliberately does not produce population-genetic inference, phylogenetic trees, haplotypes, FST, AMOVA, demographic estimates or conservation conclusions. It can retrieve and export public sequences for later analysis, but a sequence count is not diversity and an occurrence count is not abundance. BOLD remains externally available only until a public browser-compatible endpoint is verified.

`VITE_NCBI_TOOL` and optional `VITE_NCBI_EMAIL` can be configured for NCBI attribution. No secret is required or stored; the email is intentionally unset by default rather than fabricated.

## Translations

Add or edit a key in both `src/i18n/es/common.json` and `src/i18n/en/common.json`. Keep source-derived scientific content untranslated. Run `npm run lint` and `npm test` after changes.

## Contributing and citation

See [CONTRIBUTING.md](CONTRIBUTING.md), [LICENSE](LICENSE) and [CITATION.cff](CITATION.cff).