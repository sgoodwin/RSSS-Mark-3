RSSS Mark III
===

My third and bestest attempt at an RSSS syncing server.
---

I spent some time listening/reading about node.js and this will be a much better attempt at a properly written system.

The project consists of a few modules, the substantial ones have tests. The modules you can expect to work so far include:

0. index.js: 
1. server.js: Basic HTTP handling, collects POST data for POST requests.
2. router.js: A Basic routing module that works sort of like Express's routing did.
3. opml.js: An OPML parser that uses node-SAX, later this will also handle generation.