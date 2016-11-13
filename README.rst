############################
Restaurant management system
############################

Info
====

Restaurant management system built using MEAN stack.

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

Build client application for the first time
  `npm run build-fe`

Run client application development server
  `npm run serve-fe`

Troubleshooting
===============

See node-sass readme_ when having trouble with creating libsass binary.

.. _readme: https://github.com/sass/node-sass/blob/master/README.md
.. _`mongorestore docs`: https://docs.mongodb.com/manual/reference/program/mongorestore/
.. _`What are all the index.ts used for?`: http://stackoverflow.com/questions/37564906/what-are-all-the-index-ts-used-for
