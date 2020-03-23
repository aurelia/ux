# Aurelia UX Component Boilerplate

This boilerplate contains all one needs to get started writing a component for Aurelia UX that has been connected to the theming system.

## Developing

`npm install` installs dependencies for the component  
`npm run build` builds the component

## Before Merge

Open the `lerna.json` file in the root of the project and add your components folder to the `packages` node. Confirm that the lerna build still works by executing the following commands as an administrator.

`lerna bootstrap`: sets up a symlink between all of the packages in the monorepo  
`lerna run build`: builds all of the mono repo projects.