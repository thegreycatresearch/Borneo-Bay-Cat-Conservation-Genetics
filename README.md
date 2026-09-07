# Borneo Bay Cat Conservation & Genetics

**An open research and conservation data explorer for _Catopuma badia_.**

This static React + TypeScript + Vite site brings together public biodiversity, molecular, taxonomic, literature and conservation sources. It is an exploratory research tool, not an official database or conservation assessment.

## Scope of phase 1

- Spanish-first bilingual interface with English switch, persisted in `localStorage`.
- Routes for Home, Genetics, Distribution, Research, Conservation, Data Explorer, Sources and Methodology.
- Public GBIF Occurrence API and NCBI E-utilities adapters with timeout, session cache, error states and source links.
- A reusable Leaflet map for GBIF records.
- Provenance-aware TypeScript records and a GitHub Pages workflow.
- No API keys, private credentials, aggressive scraping or inferred population genetic statistics.

Research, Data Explorer and several source adapters are intentionally marked as pending until their public endpoints and data semantics are verified.

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

## Sources and limitations

- [GBIF](https://www.gbif.org/): public occurrence records.
- [NCBI / GenBank](https://www.ncbi.nlm.nih.gov/): public sequence records through E-utilities.
- [BOLD Systems](https://www.boldsystems.org/): DNA barcodes, planned adapter.
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [Crossref](https://www.crossref.org/): literature metadata, planned adapters.
- [Dryad](https://datadryad.org/): public research datasets, planned adapter.
- [Cat Specialist Group](https://www.catsg.org/): conservation context and external links.

Counts in the interface are only populated from records actually returned by a source. A missing result does not demonstrate species absence. Small sequence collections cannot support population-level diversity claims.

## Translations

Add or edit a key in both `src/i18n/es/common.json` and `src/i18n/en/common.json`. Keep source-derived scientific content untranslated. Run `npm run lint` and `npm test` after changes.

## Contributing and citation

See [CONTRIBUTING.md](CONTRIBUTING.md), [LICENSE](LICENSE) and [CITATION.cff](CITATION.cff).