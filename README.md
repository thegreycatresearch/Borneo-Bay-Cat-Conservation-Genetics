Borneo Bay Cat Conservation & Genetics

An open-source biodiversity and bioinformatics platform focused on the Borneo bay cat (Catopuma badia), one of the world’s least-known felids.

The project combines conservation biology, genetics, biodiversity data, scientific literature, taxonomy, and bioinformatics into an interactive web platform designed to make fragmented scientific information easier to explore and understand.

Why the Borneo bay cat?

The Borneo bay cat is an elusive wild cat endemic to the island of Borneo. Its rarity and limited scientific information make research and conservation particularly challenging.

Scientific information about the species can be distributed across biodiversity databases, genetic resources, taxonomic records, occurrence datasets, and scientific publications.

This project explores how these different sources can be brought together into a single, accessible research-oriented platform.

What we built

The platform provides several interconnected areas for exploring the species:

* Species Profile — biological and conservation information about the Borneo bay cat.
* Taxonomy Explorer — exploration of its taxonomic classification.
* Genetics — access to available genetic and molecular information.
* Distribution — exploration of documented geographic occurrences.
* Data Explorer — interactive exploration of biodiversity data.
* Research — scientific literature related specifically to the species.
* Data Availability — overview of available datasets and resources.
* Methodology — explanation of how information is collected and organized.
* Sources — traceability to the scientific and biodiversity resources used.

The platform is available in English and Spanish.

Data sources

The project integrates and/or retrieves information from established scientific and biodiversity resources, including:

* NCBI — genetic and molecular data
* GBIF — biodiversity occurrence data
* BOLD Systems — DNA barcode information
* Crossref — scientific publication metadata
* Dryad — research datasets
* PubMed / scientific literature resources — research and publications
* Taxonomic and biodiversity resources

The goal is not to replace these databases, but to connect and contextualize information from them around a single species.

Technology

Built with:

* React
* TypeScript
* Vite
* CSS
* REST APIs
* Scientific and biodiversity databases
* Data processing and exploration workflows

The application is designed as a modular platform so additional datasets, species information, and analytical tools can be incorporated in the future.

Conservation impact

The Borneo bay cat is difficult to study because of its elusive behavior, restricted distribution, and limited available information.

By bringing together biodiversity, genetic, taxonomic, geographic, and scientific information, this project aims to demonstrate how computational tools can support biodiversity research and conservation.

The long-term vision is to develop the platform into a broader framework for data-driven conservation of poorly studied species.

Hackathon

This project was created for NextStep Hacks 2026 — Earth Forward.

Track

Earth Forward — Conservation & Biodiversity

The project addresses biodiversity conservation through the use of computational biology, bioinformatics, and open scientific data.

Future work

Potential future developments include:

* Population genetics analysis as additional sequence data becomes available
* Expanded genomic datasets
* Conservation-status monitoring
* Automated literature discovery
* Comparative analysis with other Bornean felids
* Integration of additional biodiversity databases
* Tools for researchers and conservation organizations
* Expansion of the platform to other threatened and understudied species

Project structure

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

Getting started

Requirements

* Node.js
* npm

Installation

Clone the repository:

git clone https://github.com/thegreycatresearch/Borneo-Bay-Cat-Conservation-Genetics.git

Navigate to the project directory:

cd Borneo-Bay-Cat-Conservation-Genetics

Install dependencies:

npm install

Start the development server:

npm run dev

The application will then be available through the local development URL provided by Vite.

Live project

The live application is available here:

Borneo Bay Cat Conservation & Genetics

https://thegreycatresearch.github.io/Borneo-Bay-Cat-Conservation-Genetics/

License

This project is intended for educational, research, and conservation-oriented purposes.

Data remain subject to the licenses and terms of their respective providers.
