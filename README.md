# Course Prerequisite visualization tool
![example workflow](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/actions/workflows/staging.yml/badge.svg)
[![codecov](https://codecov.io/gh/Kurssiesitieto/kurssiesitieto-ohtuprojekti/graph/badge.svg?token=DPW7GY90EK)](https://codecov.io/gh/Kurssiesitieto/kurssiesitieto-ohtuprojekti)

This project is a web application designed to help students plan their studies by showcasing hierarchical relations between different courses. The app is built with React and Vite with the aim of creating intuitive and interactive way to visualize the relations between different courses. The project fetches course data from Sisu and will later take advantage of University of Helsnki login to fetch students personal data to help students further plan their studies. 

This project is part of Software engineering course in University of Helsinki (Ohjelmistoprojekti TKT20007)

[Link to the visualization tool](https://shibboleth.ext.ocp-test-0.k8s.it.helsinki.fi/esitieto) (You must be connected to the university network to visit the link.)

# Table of Contents
- [Prerequisite course visualization tool](#prerequisite-course-visualization-tool)
- [Table of Contents](#table-of-contents)
- [Documentation](#documentation)
- [Project links](#project-links)
- [Quickstart](#quickstart)
  - [Downloading](#downloading)
  - [Installation](#installation)
  - [Running the program locally](#running-the-program-locally)

# Documentation
- [Definition of done](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/definition-of-done.md)
- [Roles for the meetings](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/roles-for-the-meetings.md)

# Project links
- [Backlog](https://github.com/orgs/Kurssiesitieto/projects/2)
- [Timesheet](https://docs.google.com/spreadsheets/d/1vvUljnH17TXNOLkz6lFW4YPMWOk6QO8IYzd4c9X_hcw/edit?pli=1#gid=743230294)
- [Minutes of meetings](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/meetings.md)

## Quickstart

### Downloading
Run the following command in the terminal:
```bash
git clone git@github.com:Kurssiesitieto/kurssiesitieto-ohtuprojekti.git
```
### Installation
Run the following command in root directory:

```bash
npm run install:both
```
Installs the required dependencies on both frontend and backend

### Running the program locally

Temporary solution for running the program locally:

```bash
npm run setup-and-run
```

Windows version

```bash
npm run setup-and-run-windows
```

Runs the app on http://localhost:3001/
