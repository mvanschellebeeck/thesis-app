# Desalination Map

Queries [spreadsheet](https://docs.google.com/spreadsheets/d/1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U/edit#gid=0) for desalination
plants and their locations/properties.

Note:
- Must contain only property and value columns
- All plants must contain at least `Name`, `Longitude` and `Latitude` properties
- In row iteration a new plant is identified once the `Name` field is read

## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
