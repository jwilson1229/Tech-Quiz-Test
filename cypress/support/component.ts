// ***********************************************************
// This support file is processed and loaded automatically before your
// component test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import './commands';
import { mount } from 'cypress/react18';

// Import global styles if needed
// import '../../client/src/index.css';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add the mount command for React components
// @ts-ignore - Cypress namespace is also a runtime object in the actual execution context
Cypress.Commands.add('mount', mount);

// The types are already defined in our cypress.d.ts file
