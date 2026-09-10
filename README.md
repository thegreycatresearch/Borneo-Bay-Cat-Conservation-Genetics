# Borneo Bay Cat Conservation & Genetics

**An open-source biodiversity and bioinformatics platform for the conservation and study of the Borneo bay cat (*Catopuma badia*).**

---

## About the Project

The **Borneo Bay Cat Conservation & Genetics** project is an interactive platform dedicated to one of the world's least-known wild felids: the **Borneo bay cat (*Catopuma badia*)**.

The project brings together information from **biodiversity databases, genetic resources, taxonomic records, geographic occurrences, and scientific literature** into a single research-oriented platform.

Its goal is to demonstrate how **bioinformatics and open scientific data can support biodiversity research and conservation**, particularly for rare and understudied species.

---

## Why the Borneo Bay Cat?

The Borneo bay cat is a small wild felid **endemic to the island of Borneo**.

Despite being scientifically recognized for decades, it remains one of the least-studied felids in the world. Its elusive behavior, restricted distribution, and limited observations make studying its ecology, genetics, and population status particularly challenging.

Scientific information about the species is also fragmented across multiple databases and research resources.

This project explores how technology can help **connect these scattered sources of information and make them easier to explore**.

---

## What We Built

The platform provides an interconnected set of tools and information pages focused on the Borneo bay cat.

### Species Profile

Provides an overview of the species, including its biology, distribution, conservation context, and other relevant information.

### Taxonomy Explorer

Explores the taxonomic classification of the Borneo bay cat and its position within the Felidae family.

### Genetics

Provides access to available genetic and molecular information related to the species.

### Distribution

Allows users to explore documented geographic occurrences and distribution information.

### Data Explorer

Provides an interface for exploring biodiversity and scientific datasets.

### Research

Connects users with scientific publications and research related specifically to the Borneo bay cat.

### Data Availability

Shows what types of scientific and biodiversity data are currently available and where they originate.

### Methodology

Documents how information is collected, processed, connected, and presented by the platform.

### Sources

Provides traceability to the scientific databases and external resources used by the project.

---

## Data Sources

The platform connects information from established scientific and biodiversity resources, including:

- **NCBI** — genetic and molecular information
- **GBIF** — biodiversity occurrence data
- **BOLD Systems** — DNA barcode data
- **Crossref** — scientific publication metadata
- **Dryad** — research datasets
- **PubMed and scientific literature resources** — scientific publications
- **Taxonomic and biodiversity resources** — classification and species information

The project does **not replace these databases**.

Instead, it uses them as sources and brings their information together around a single species to provide a more accessible research experience.

---

## Technology

The project was built using modern web technologies and scientific data resources.

### Core Technologies

- **React**
- **TypeScript**
- **Vite**
- **CSS**
- **REST APIs**

### Scientific & Biodiversity Infrastructure

- NCBI
- GBIF
- BOLD Systems
- Crossref
- Dryad
- PubMed and scientific literature resources

---

## Conservation Impact

The Borneo bay cat represents a broader challenge in biodiversity conservation:

> **How can we study and protect species when the available information is limited and distributed across different scientific resources?**

By connecting genetic, taxonomic, geographic, biodiversity, and scientific-literature information, this project demonstrates how computational tools can contribute to the study of poorly known species.

The long-term vision is to develop the concept into a broader framework for **data-driven conservation of rare and understudied wildlife**.

---

## Hackathon

This project was developed for:

**NextStep Hacks 2026 — Earth Forward**

### Track

**Earth Forward**

The project focuses on:

- Biodiversity conservation
- Wildlife research
- Computational biology
- Bioinformatics
- Open scientific data
- Conservation technology

---

## Future Work

Potential future developments include:

- Population genetics analysis as additional sequence data becomes available
- Expanded genomic datasets
- Conservation-status monitoring
- Automated scientific literature discovery
- Comparative analysis with other Bornean felids
- Integration of additional biodiversity databases
- More advanced geographic and occurrence analysis
- Research tools for conservation organizations
- Collaboration with wildlife researchers and conservation groups
- Expansion of the platform to other threatened and understudied species

---

## Project Structure

```text
src/
├── pages/
│   ├── DataAvailabilityPage.tsx
│   ├── DataExplorerPage.tsx
│   ├── DistributionPage.tsx
│   ├── GeneticsPage.tsx
│   ├── ResearchPage.tsx
│   ├── SpeciesProfilePage.tsx
│   └── TaxonomyPage.tsx
├── App.tsx
└── styles.css
