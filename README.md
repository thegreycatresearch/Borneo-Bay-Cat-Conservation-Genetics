# Borneo Bay Cat Conservation Genetics Hub

An open-source bioinformatics, geospatial, and conservation platform dedicated to the Borneo Bay Cat (*Catopuma badia*), one of the world's most elusive, under-studied, and endangered wild felids.

Developed for NextSteps Hacks 2026.

---

## The Species: Why Catopuma badia Matters

The Borneo Bay Cat (*Catopuma badia*) is an evolutionarily distinct, small wild cat endemic to the island of Borneo (divided between Malaysia, Indonesia, and Brunei). It is currently classified as Endangered on the IUCN Red List of Threatened Species, with an estimated adult population of fewer than 2,500 individuals.

### Evolutionary Distinctiveness
* Diverged from its closest relative, the Asian golden cat (*Catopuma temminckii*), approximately 3.1 to 4.9 million years ago during the Pliocene epoch.
* Represents a irreplaceable evolutionary lineage within the Felidae family, offering critical insights into the biogeography and adaptive radiation of Southeast Asian carnivores.

### The "Data Deficient" Conservation Challenge
* Extremely cryptic behavior, low population density, and preference for dense primary rainforests make field studies exceptionally difficult.
* The first living specimen was not captured and photographed until 1992, and basic parameters such as exact home ranges, population structure, and dietary habits remain largely unquantified.

### Genetic Risks and Forest Fragmentation
* Borneo has lost vast expanses of primary rainforest due to commercial logging, palm oil expansion, and infrastructure development.
* Habitat fragmentation isolates local populations into small, non-interconnecting forest pockets.
* This isolation severely restricts gene flow, accelerating genetic drift, reducing heterozygosity, and increasing the risk of inbreeding depression, which lowers disease resistance and long-term reproductive viability.

---

## Project Overview

The Borneo Bay Cat Conservation Genetics Hub was built to bridge the gap between field ecology and molecular conservation genomics. Existing genetic records, geographical observations, and literature entries are fragmented across global databases and isolated publications. Without a unified tool, conservationists cannot easily map genetic sample origins against critical forest corridors.

This platform functions as a centralized **Geographic Discovery & Open Data Export Hub**. By spatializing genetic metadata alongside field sightings and providing structured export capabilities, the platform enables researchers, decision-makers, and conservation NGOs to identify genetic bottlenecks, prioritize protected land corridors, and streamline bioinformatic workflows.

---

## Key Features

* Interactive Distribution Map: Visualizes validated georeferenced sightings across the provinces of Borneo to highlight core habitat areas and potential connectivity bottlenecks.
* Historical & Unmapped Record Catalogue: Integrates historical, non-georeferenced, and literature-derived sightings in a dedicated structured view, ensuring valuable historical data is preserved without introducing spatial errors onto the map.
* Direct NCBI GenBank Integration: Links mapped observation points directly to their corresponding official NCBI GenBank accessions (`nuccore`), providing one-click access to primary sequence data and locus details at the source.
* Open Data Export Engine: Enables users to download aggregated observational, spatial, and genetic metadata in standardized **JSON** and **CSV** formats, ready for downstream statistical and spatial analyses in R, Python, or QGIS.
* Ethical Data Handling Protocols: Incorporates spatial abstraction for precise coordinates of sensitive observation sites to prevent data exploitation by illegal wildlife poachers and illegal traders.

---

## System Architecture & Data Flow

1. Data Ingestion: Aggregates verified occurrence records and public genetic accession metadata associated with *Catopuma badia*.
2. Indexing & Normalization: Maps genetic accessions to spatial attributes, extracting publication details, years, and locus types.
3. Visualization Layer: Renders interactive map layers alongside non-spatial historical tables.
4. Export Pipeline: Formats filtered records on demand into machine-readable JSON or tabular CSV formats.

---

## Tech Stack

* Frontend Framework: React (TypeScript)
* Build Tooling: Vite
* UI Components & Styling: Custom CSS Scaffolding, Lucide React
* External Services: NCBI Entrez Utilities / GenBank API Metadata
* Hosting & Deployment: GitHub Pages

---

## Getting Started Locally

### Prerequisites
* Node.js (v18.0.0 or higher recommended)
* npm or yarn

### Installation Steps

1. Clone the repository:
   git clone https://github.com/thegreycatresearch/Borneo-Bay-Cat-Conservation-Genetics.git

2. Navigate into the project directory:
   cd Borneo-Bay-Cat-Conservation-Genetics

3. Install project dependencies:
   npm install

4. Launch the local development server:
   npm run dev

5. Build the application for production:
   npm run build

---

## Data Sources & Ethics

* Genetic metadata is retrieved from and credited to the National Center for Biotechnology Information (NCBI) GenBank database.
* Observational and spatial records are curated from published peer-reviewed conservation literature and public biodiversity datasets.
* Precise locations of recent observations are intentionally generalized to protect wild populations from poaching threats.

---

Developed to advance wildlife conservation, genetic monitoring, and open bioinformatic tools for endangered species.
