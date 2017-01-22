############################
Restaurant management system
############################

Info
====

Restaurant management system built using MEAN stack.

Using Angular 1.x for client app - written in TypeScript, using ng-metadata decorators.

Using barrels to rollup exports from several modules.
Check here for more info: `What are all the index.ts used for?`_ 

Requirements
============

- Node.js 6
- MongoDB

Prerequisites
=============

1. Install MongoDB

2. Import database dump (`mongorestore docs`_)

3. Install Node.js 6

4. Run:

   `npm install`

Launch
======

Run mongo
  `mongod --dbpath ~/data/db`

Run express api server
  `npm run serve-api`

Run front end development server
  `npm start`

Building front end
  `npm run build:dev`

Testing
=======

For unit tests, we're using Facebook's Jest testing framework: http://facebook.github.io/jest

`npm run test` - run unit tests
`npm run test:watch` - run unit tests in watch mode - reruns tests on file change

Debugging tests
---------------

For Visual Studio Code users, use following configuration in *launch.json*:

.. code-block:: json

  {
    "name": "Run Tests With Debugger",
    "type": "node",
    "request": "launch",
    "port": 5858,
    "address": "localhost",
    "stopOnEntry": false,
    "runtimeExecutable": null,
    "runtimeArgs": [
      "--debug-brk",
      "./node_modules/jest/bin/jest",
      "-i"
    ],
    "cwd": "${workspaceRoot}"
  }

Troubleshooting
===============

See node-sass readme_ when having trouble with creating libsass binary.

.. _readme: https://github.com/sass/node-sass/blob/master/README.md
.. _`mongorestore docs`: https://docs.mongodb.com/manual/reference/program/mongorestore/
.. _`What are all the index.ts used for?`: http://stackoverflow.com/questions/37564906/what-are-all-the-index-ts-used-for
