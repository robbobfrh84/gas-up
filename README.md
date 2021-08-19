[![Tweet](https://img.shields.io/twitter/url/https/github.com/jonsn0w/hyde.svg?style=social)](https://twitter.com/BobMain49)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/sponsors/robbobfrh84)

[![Github all releases](https://img.shields.io/github/downloads/Naereen/StrapDown.js/total.svg)](https://GitHub.com/Naereen/StrapDown.js/releases/)



# gas-stack (Google App Scripts with Google Sheets for data storage)
If you're a front-end developer looking to prototype with logins, databases and APIs: consider some GAS. This is a light weight (and uh, free) way to create **live** full-stack web application.

NOTE TO BOB:
- WARNING! Don't change at this repo at all. it's done, and recorded in original-gas-db folder in dev-gas-stack/versions.
- You're working on gas-stack_v1.0!
- You updated this to sit in the purist gas-db_v1.0 state, & it's mirrored 👆.
  - And, probably don't include this note in gas-stack_v2.0


----
# Documentation (Version gas-db_1.0)

### Guide to getting started with a gas-stack project

Create a google sheet to be your database
- Visit `sheets.google.com` (you may need to login first)
- Under *Start a new spreadsheet* select [blank]
- rename "Untitled spreadsheet" to whatever you want
  - We'll use `gas-db-example` for this guide.

Add Database API code to Sheet.
* In your new sheet, select: *Tools* > *Script Editor*
* Copy / Paste entire contents of `gas-db_v1.0.gs`(found in this folder)
* *Save* Your Script
  * Note: development example sheet and code found [here](https://docs.google.com/spreadsheets/d/1obGKnWSuQsXNyBUP2h5UOjszPiPgkYk7aVZdRSScnEI/edit#gid=0)

Publish your API
* In the Script Editor, select: *Publish* > *Deploy as web app*
* Find and select: *"Who has access to the app"* to *"Everyone, even anonymous"*.
  * NOTE: This is just for the software so it can be accessed programmatically. NOT access to view the google spreadsheet itself. That's still private.
* Select: *Review Permissions*
* Log into your gmail account
* Now, Select *advanced* to authorize > *continue to unsafe*
* The url is not the global url you want. For that, you need to make your API global.

Make API global
* In the Script Editor, select: *Publish* > *Deploy from minifest* >
* Then, select: *'web app meta-version'* >
* !copy link next to GLOBE

Congratulations! this is your API's URL! Save it to add to your front-end code!


### What if you already have a google sheet you'd like to add as your db?

Open your Google Sheet...
* With your sheet open > file > download as > Microsoft Excel (.xlsx)
* Save file somewhere in your google drive.

In your new Google Sheet
* File > Import > find your .xlsx
* select > Replace your spreadsheet

---
# API CRUD REQUESTS: Add to browser-side code

### Basic Example
```javascript
_gas.crud(
  "READ" , // action
  "sheet", // scope
  { // fields
    sheetName: 'some name of sheet in your spreadsheet',
  }
}).then( payload => {
  if (!payload.error) {
    console.log(payload.data)
  }
})
```

### CREATE
| scope        | required fields           | option fields  |
| ------------- | ------------- | ----- |
| sheet      | sheetname (string)	 | - |
| addkeys      | sheetname (string), keys (Array)	 | - |
| row      | sheetname (string)	      |   content (object), _Id (default: true) |
| cell | *use 'UPDATE cell'      | - |

### READ
| scope        | required fields           | option fields  |
| ------------- | ------------- | ----- |
| all      | - | - |
| sheet    | sheetname (string)	| - |
| row      | sheetname (string), _Id(string) | - |
| cell | sheetname, cell | - |

### UPDATE
| scope        | required fields           | option fields  |
| ------------- | ------------- | ----- |
| row      | sheetname, _Id	 | content (object) |
| cell | sheetname (string), cell (string) | content (object) , increment (number), date (String) |

### DELETE
| scope        | required fields           | option fields  |
| ------------- | ------------- | ----- |
| row      | sheetname (string), _Id(string) | - |
| cell | *use 'UPDATE cell', set field.content = "" | - |

# In Google Sheets Cell triggers

`_Id` in **first** row AND _empty_ column.
- This will generate all Ids for subsequent rows of data.
- Also, any new row data will generate a new id and name range.
  - NOTE: this may take a 1 sec or two and typing before it set in could cause issues.

`_Del` in column of ids in a row with width range names.  
- Will remove the name range and id.
  - NOTE: this may take a 1 sec or two, and typing before it sets in could cause issues.

`_Date`
- places a human timestamp.
