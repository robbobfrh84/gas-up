...🤔 clasp dev run is pretty thorough so far...
- I think i'm realizing that the way I build out the gas stack originally might not make since anymore. I may want to just redo it from scratch...
- This sounds crazy, but it would allow me to document all the google 'docs' methods that are used in a more useful way... Like, how I do in `spa` more notes and opened up.
- So, I can start all over again by creating the github repo and building out from scratch. gas-stack_v1.0.gs, gas-stack_v1.0.js,

### Next 3-ish ✅

- Finsish review_2020
  - Delete all from clasp (in readme.md at end)

- Move to Tutorials_Examples
  - Note: quick-api-example does not use CLI, but, both are GAS, So maybe create a `Google App Scripts` folder and put them both in there seperate. Add it to Google Cloud folder. But! maybe change that name to Google Development.
  - Check that examples work when `cd`ed and clasp after move

- Desolve and move `gas-stack-create` to shed, change to "gas-stack-create_UI"
  - Make sure the readme is desolved. You've got some notes you may want to move.
  - find `__dev/gas-stack` home for gsheet

- Jump over to hooking this example up with kitchen sink...

- Get all it working for tester_kitchen_sink
- You're using gas-stack-create for tester_kitchen_sink, let's make it's own sheet.

### To Do...

- Create dev-gas-stack repo
- Start building out/toward using kitchen sink.

---
- Dev flow done? handle Delete sheet

### Admin To Do...
- ✅Rebrand repo: decide on name(s) and update repo wide.
  - I say stick with gas-stack its more memorable. NOTE: gas-db_v1.0 (change?)
  - Then, you could make gas-stack_v1.0, rather than 2.0?

----
# gas-stack_v1.0 Goals

Rebuild gas-stack from scratch
- Setup a development workflow that's well documented for you in future.
- Document each API function of the "Dev"-side well with Notes
- Complete test_kitchen_sink, and another testers up to gas-db_v1.0 standard.
  - ! With delete Sheet added

Native Auth & Admin control:
- See `auth diagram.jpg`
- Sign up with email, change password, forgot password

GAS Class Client: Features
- update to fetch...
- retry if request fails, like in the case where greg had to refresh.

----
# Future Features
- Google user Auth
- Add photos. I know you can upload photos into cells. So maybe there's an easy way to handle that within the GAS docs...
- Cron Job control
