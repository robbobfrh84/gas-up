!UPDATE:
- BOB👀you jumped back into this project on 12/4/2020...
- After being away for a year or so...
- couldn't figure out where I was at... or headed.
- I "THINK" this is a UI website thing, that would be really nice if we pushed forward with making this a ligit tool.
- BUT, NOT a development site. Looks like I got distracted creating UI while trying to learn CLASP.....

# Dev Notes

- Quick update line for version 3! `clasp push; clasp deploy -i AKfycbyGSuUQMuuaPAYAF-mgbg52A-ZLUv6h-jZ_Bk_kO0hf0PylmdPvWwytGpas4v9hq0_y`

### Clasp Dev notes

* Make sure you've `cd`'ed into project folder where you want your project.
* it will create a .clasp.json file and if you do it wrong, you'll want to delete it.

Login/cloning
* $`clasp login`, in project folder. Will open browser tab to login to gmail.
* $`clasp clone 1Klr38u9WZ6QDOx5ck-LUrVtcsyp7NE8u0Hp-N4Y0_KP80jmnWVU7rI3A`
  * SProject Properties > Script ID ☝️
* $`clasp open` to see browser console with script.

Development in UI?
* $`clasp pull`

Development locally
* $`clasp push`

NOTE: you'll have to do a hard refresh to see change

### add project to console
- Go to https://console.developers.google.com/
- create new project name it the same `gas-db-example`
- $`clasp logs --json`
- $`clasp logs --watch`

### Develop and Deploy

After you `clasp push` your changes...
* $`clasp deploy`
  * Note: this will create a new version. COPY that id.

* Likely, you'll really be pushing and deploying at the same time, same version.
* $`clasp push`, then
* $`clasp deploy -i <the version id>` or whatever version you want to deploy from. Note, you might need to check the browser ui to get the most current version
  * Example: `clasp deploy -i /s/AKfycbyGSuUQMuuaPAYAF-mgbg52A-ZLUv6h-jZ_Bk_kO0hf0PylmdPvWwytGpas4v9hq0_y`

#### ALL IN ONE!
- $`clasp push; clasp deploy -i AKfycbyGSuUQMuuaPAYAF-mgbg52A-ZLUv6h-jZ_Bk_kO0hf0PylmdPvWwytGpas4v9hq0_y`

#### Browser link !Important
* you'll wanna make sure you're using the correct deployment link to see changes on your browser code. So...
  * In the example above the deploy id I used was from version 3.
  * Go to the console and select Publish: 'deploy from manifest'
  * version three is the link you'll now want in your client side code.
