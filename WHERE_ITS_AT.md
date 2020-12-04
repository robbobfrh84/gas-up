# Next... 3-ish
- breakup .js functions into logical files.
- {add key} event forces focuses in new input box.
- {create new sheet} collapses, clears and add a message telling user to select {get all the sheets}

# gas-db-example ToDo
- ✅Handle sheet create without keys...
- handle a sheet with no name. allow it and create it, and return `sheet16` as name.
- update create sheet to have dynamic function builder with inputs ?
- handle Delete sheet (gas side)
- delete sheet (client)

### Misc. ToDo
- move github domain hosting to tutorials/examples
- Rebrand repo: decide on name(s) and update repo wide.
  - I say stick with gas-stack its more memorable. NOTE: gas-db_v1.0 (change?)

# gas-db-example Goals

The idea is to build this out to be a complete example of all the functions and, to create the wiki in parallel.
- Also, it'd be fun to create a seeding function that runs an async chain that starts with deleting everything and building some fun 2-3 sheet table sets!
- ALSO, this could be roughly the primary function of a website with an added part where you plug in the link to your own sheet (A guide to create is included)

- First, build all the use-cases out here.
- Then, refactor the gas-db so that changes in this gas-code become the primary files in a new `gas-code` folder OUTSIDE of the `gas-db-example` folder
  - And, update the minified...
- Build out this example AND WIKI same time.
  - link examples in wiki to actual gas-db-example code folder.

Auth: *After* this organization of build out is set, create an MVP to do for auth.
- See `auth diagram.jpg`

Thoughts on name...
- The long name in the header is nice, but i still like gas-stack. it just rolls of the tongue. but i want to say "Google Apps Script & Sheet Data Storage"
