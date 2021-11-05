<!-- [![Tweet](https://img.shields.io/twitter/url/https/github.com/jonsn0w/hyde.svg?style=social)](https://twitter.com/BobMain49) -->
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/robbobfrh84/gas-up)
[![made with love](https://img.shields.io/badge/Made%20With-Love-orange.svg]()

[![clasp](https://github.com/google/clasp/actions/workflows/ci.yaml/badge.svg)](https://github.com/google/clasp)
[![gas](https://img.shields.io/badge/code%20style-google-blueviolet.svg](https://developers.google.com/apps-script)




# GAS Up ⛽️ 🚀
### Build dynamic client-side **apps** with google sheets as a database
- Build, read, update and delete sheets with client-side API requests.
- The connected google sheet is laid out _like_ a database with tables and entries.
- Customize your cloud "back-end" with an open-source Google Apps Script(GAS) library.

### Accessible & updatable data, for a quick and light full-stack
- Build microsites
- Prototype web apps
- Host static data
- Integrate Iot apps and logging,
- Or, whatever else some wacky person might dream up 🤔😃🤯!

### How?
Google Sheets allow for javascript to control and automate Google Sheets with what they call "Google Apps Scripts". To see a simple example of this, start by creating a new [Google Sheet](sheet.google.com).
- Select: "Tools" > "Script editor" to see where you'd code your "Google Apps Script" app.
- Here, you can also add __Libraries__ that have already been created to do special things!

### **GAS Up** is one of those libraries! And, It's open source!
And, you don't need to add any Google Apps Script code of your own to get started. GAS Up creates an API that allows client-side apps to directly access, and update, data from any Google Sheet you own and allow access to.  

### Getting started: The Basics
Get started by simply making your own copy of the [GAS Up Starter](https://docs.google.com/spreadsheets/d/1uY1mA1tUGRR8kxuc9QdSL1u1ScNvhUvsidAd2yIEFz0/edit#gid=310584182) Google Sheet and following the directions on the sheet.
- NOTE: you MUST **copy** that sheet. It won't work unless you do.


----

### Build your Front-end with the GAS Up API
With simple `fetch` requests, you can retrieve and manipulate your sheets data simple by modifying the url query string.

### And, GAS is really just javascript
Google Apps Script is really just javascript that can do things with google docs.  

_NOTE: Jump to the [Script Editor](#the-script-editor) section for more info on source, and custom Google Apps Script code._

##### sheet & row metadata
Both the **A1** cell of a sheet, and each rowId cell have a note with `json` code. This is important and should **not** be removed or modified without knowing the full consequences. The sheet `json` comes default with keys `sheet_metaData` and `state`
- The `sheet_metadata` key is for gas-up that tells the code what type of sheet it's dealing with. For example, when modifying a sheet or row, they code will check that the sheet is a `type: table` in the `sheet_metaData` before allowing table type changes to the sheet.
- The `state` key is for app specific / manual changes. here you have a place to add different variables that may inform you app about specifics of the sheet or row.

The **row** `json` note contains info specific info about the row and should also not be messed with. But, just like with sheets, the `state` can be modified for app specific needs.

### Grid Sheets
Grid sheets are much more free and open. More like how a user with interact with a spreadsheet. So, easy to update and read. But, also easy to mess up your data on these types of sheets.  

## The Script Editor
#### Adding custom Google Apps Script code
wip ...

### The source code
wip ...
