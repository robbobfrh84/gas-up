# Review Notes after returning a few years later.
I just want to go through this guide again in Dec. 2020 and see if anything has changed, or I'd missed something.
- I did clarify and update a few things on clasp-dev-run-example. So, that's still the best place to walk-through setting up a GAS project
- Source code: I just did all of this by creating a project folder on my Desktop. So, source code files for this example may not be recorded here.


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
