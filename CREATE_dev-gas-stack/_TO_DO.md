### Next 3-ish ✅

Finsish review_2020
- Delete all from clasp
- Clean review_2020

Tidy-up **clasp-cli-development** folder.
- clasp-dev-run-example needs notes on how to update, you need to hide authentications with gitignore, and write guide to developing. Probably worth starting from clasp clone ... then, document how to get throught to working with clasp run...
- Clean README.md: Make sure it's easy to open this clasp tutoral and know how to open the example to see endgame.
- Move to Tutorials_Examples > `Google Development/Google App Scripts`
- remove from gas-stack and github update.
- Check that examples work when `cd`ed and clasp after move

Create dev-gas-stack repo

Update gas-stack repo

### To Do...

Start documenting track to build out new gas-stack_v1.0
- Where do `gas-stack_v1.0` files go
- Where / how to we document the origial build of new gas-stack
- the gas-stack.js and gas-stack.gs are the core code, but how do we handle the *development google cloud* applicatoin aspect of it...

### Admin To Do...

- ✅Rebrand repo: decide on name(s) and update repo wide.
  - I say stick with gas-stack its more memorable. NOTE: gas-db_v1.0 (change?)
  - Then, you could make gas-stack_v1.0, rather than 2.0?


----
# gas-stack_v1.0 Goals (MVP)

Rebuild gas-stack from scratch
- Setup a development workflow that's well documented for you in future.
- Document each API function of the "Dev"-side well with Notes
- Complete a crud_sheets, and another testers up to gas-db_v1.0 standard.
  - ! With delete Sheet added

Native Auth & Admin control (See `auth diagram.jpg`)
- Sign up with email, change password, forgot password
- Admin monitor access & inScript setup/change account

GAS Class Client: Features
- update to fetch...
- retry if request fails, like in the case where greg had to refresh.

----
### Future Features (See: documentation/future_feature_ideas)
