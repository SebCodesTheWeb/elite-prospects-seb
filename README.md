# Elite-Prospects-NHL-table

Demo: https://elite-prospects-seb-sebcodestheweb.vercel.app/

Display of NHL conferences/divisions and standings of 2022-2023. The project is implemented using Next.js, Chakra UI, Redis for middle layer caching, Eliteprospects API, Tanstack Query, Tanstack Table, Typescript and Jest.

[![Demo video](https://img.youtube.com/vi/_4-4HsSBfqE/0.jpg)](https://www.youtube.com/watch?v=_4-4HsSBfqE)

## Usage

Clone this repo, install packages and run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

The projects main code is kept under src, and the api middlelayer is kept under pages/api.

The root of the project is under src/app, here the layout, react context providers and global styling are placed.

The main chunk of react is under src/components, here all the components sit in folders and grab their data from an adjacent hook which calls the middle layer api using tanstack query.

The middle layer is under pages/api, it acts like a BFF and makes the appropiate api requests to the real backend. It then passes the data through an adapter which formats the data to what the frontend expects. The consistency of these types are handled by the top level types folder where each middle layer endpoint as a .model file.

All api requests to the middle layer are intersected by the caching middleware which firstly checks if the requested url is a matching key in the redis db, if not it proceeds to request the data from the api and then caches it for up to 1 hour.
