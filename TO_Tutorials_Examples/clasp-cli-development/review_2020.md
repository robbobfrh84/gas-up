# Review Notes after returning a few years later.
I just want to go through this guide again in Dec. 2020 and see if anything has changed, or I'd missed something. Really just to obsorb it again, because I'd forgotten a lot.
- I did clarify and update a few things on clasp-dev-run-example. So, that's still the best place to walk-through setting up a GAS project
- Source code: I just did all of this by creating a project folder on my Desktop. So, source code files for this example may not be recorded here, and may have been removed.

### Reactions
☺️ After creating a 2nd project I realized to really just think of this as like github, where every project I create under my gmail account is already added to `clasp list`. So, i can be anywhere, on any computer, and just install `clasp` and `clasp clone <project ID>`. And really, working by myself, it's a pretty simplified version of that.
- Obviously, it's a bit tricky to get that long ID, but, it just take a second because the name is associated with all the ID when your run `clasp list`.
- Also, the project your "on", is the folder of the project you're in. So `.clasp.json` at the current directory is who you talking to when you `clasp pull`/`push`. I was tripped up a bit on this at first. Then realized, oh yeah, it's like github.


### What I did:
- $`clasp -v` to see if you already have flask installed
  - If no: $`npm install @google/clasp -g`
- Create Project folder: $`cd Desktop/`, $`mkdir review-clasp`,
- $`clasp login` > new browser tab auto opens to authenticate
- $`clasp create review-2020` > select: "webapp"
  - This action creates `appscript.json` file in your folder,
  - And GAS link (See in Links below)
- $`clasp pull` > Will pull down the `code.js` form link
- I then opened the "Code.js" file and added the code: (see: Code below)
- $`clasp push` > adds new code to GAS in browsers.
- $`clasp open` > opens your GAS in browser. 1st time sometimes takes 2x tries🤷‍♂️
- Press [▶️] to run selected "myFunction" > Then, *view* > *logs* (or ⌘+enter)

----
REMOVE WHEN DONE!
Project ID: review-2020-298823
Project Number: 491470129053
Client ID: 491470129053-s8flfbi85bdg0a2l375lu7emvaeg7u8s.apps.googleusercontent.com
Client Secret: oV_XYFgibhUln27erGJImDcr
...

??? if just notes are updated/change in README.md you don't need this. It'll just add more confusion.
I'm just


...




You'll need to Log in locally for `clasp run` and see logs in terminal cli🤓. To do that, you must first create a google cloud project.
🔥🔥🔥
- http://console.developers.google.com
- Find project dropdown and select **{NEW PROJECT}**
- **Project name**: "review-2020"
  * NOTE: can't reuse the name of a deleted project per google's docs


# Links

Clasp generated project link:
- https://script.google.com/d/1SodOiqiiymq1OLjqcBJAmdB6HBwBZuKtYeWGJLS6lKtjGQ8-9Q-Dhj4f/edit
- NOTE: maybe will have deleted this.

# Code

- Code.js
```javascript
function myFunction() {
  Logger.log("A log for you")
  return "Ok it works here"
}
```
