# Desalination Map

Queries [spreadsheet](https://docs.google.com/spreadsheets/d/1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U/edit#gid=0) for desalination
plants and their locations/properties.

Note:
- Must contain only property and value columns
- All plants must contain at least `Name`, `Longitude` and `Latitude` properties
- In row iteration a new plant is identified once the `Name` field is read

## ABS Boundary Data

Latest boundary data (`.zip`) from [ABS Digital Boundaries](https://www.abs.gov.au/websitedbs/D3310114.nsf/home/Digital+Boundaries)

[Volume 1](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.001July%202016?OpenDocument) – Main Structure and Greater Capital City Statistical Areas 

[Volume 2](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.002July%202016?OpenDocument) - Indigenous Structure

[Volume 3](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202018?OpenDocument) - Non ABS Structures

[Volume 4](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.004July%202016?OpenDocument) – Significant Urban Areas, Urban Centres and Localities, Section of State

[Volume 5](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.005July%202016?OpenDocument) - Remoteness Structure

### Notes

Formats:
- `.csv`
- `.gpkg`
- ESRI shapefiles (`.shp`, `.shx`, `.dbf`)

## Quick Start

``` bash
# start docker (Install docker)
docker pull mongo:4.2.1
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4
# insert values
docker exec -it mongodb bash
mongo
use regional
db.createCollection("plantDetails")

use technologies
db.createCollection("technologyTypes")
# run scripts

npm install
npm install client # eventually remove react-scripts dependency

# get mapbox api key
# add REACT_APP_MAPBOX_TOKEN="..." to client/.env

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 
# Client runs on http://localhost:3000
# Mongodb server runs on mongodb://localhost:27017
```
