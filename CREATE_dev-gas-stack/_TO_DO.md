Turns out it was smart to do it first with review_2020. I did run into some differences problems.
- After fixing a few small change (big blocker) I realized the "#### Add OAuth
" section was the most undocumented and changed. I wondered why it's needed.
- BUT, i "think" we need the authenticate MY computer. It'll be interesting when getting it running on the macbook.


### Next 3-ish ✅

Finsish review_2020
- Delete all from clasp
- Clean review_2020

Tidy-up **clasp-cli-development** folder.
- Clean README.md: Make sure it's easy to open this clasp tutoral and know how to open the example to see endgame.

Move to Tutorials_Examples
- Note: quick-api-example does not use CLI, but, both are GAS, So maybe create a `Google App Scripts` folder and put them both in there seperate. Add it to Google Cloud folder. But! maybe change that name to Google Development.
- Check that examples work when `cd`ed and clasp after move

Create dev-gas-stack repo

### To Do...
- Desolve and move `gas-stack-create` to shed, change to "gas-stack-create_UI"
  - Make sure the readme is desolved. You've got some notes you may want to move. AND! find `__dev/gas-stack` home for gsheets. Might as well keep alive. I enjoyed the UI.

- Start building out/toward using kitchen sink.
  - Still needs to be thought out what we're doing here...
  - the new `gas-stack_v1.0` will need a Read All and Create Sheet.
    - THEN, you can just plug in the new api, and your off!


### Admin To Do...
- ✅Rebrand repo: decide on name(s) and update repo wide.
  - I say stick with gas-stack its more memorable. NOTE: gas-db_v1.0 (change?)
  - Then, you could make gas-stack_v1.0, rather than 2.0?


----
# gas-stack_v1.0 Goals (MVP)

Rebuild gas-stack from scratch
- Setup a development workflow that's well documented for you in future.
- Document each API function of the "Dev"-side well with Notes
- Complete test_kitchen_sink, and another testers up to gas-db_v1.0 standard.
  - ! With delete Sheet added

Native Auth & Admin control (See `auth diagram.jpg`)
- Sign up with email, change password, forgot password
- Admin monitor access & inScript setup/change account

GAS Class Client: Features
- update to fetch...
- retry if request fails, like in the case where greg had to refresh.

----
### Future Features (See: documentation/future_feature_ideas)
