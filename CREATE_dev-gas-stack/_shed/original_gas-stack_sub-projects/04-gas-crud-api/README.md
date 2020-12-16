# Developing with a basic Google Apps Scripts CRUD API (Create, Read, Update, Delete)

### quick start

If you already have a Google Sheet...
* With your sheet open > file > download as > Microsoft Excel (.xlsx)
* Save file somewhere in your google drive.

Add Google Apps Script code(.gs):
* Option 1: Copy template
  * Copy Google Sheet Template
  * link to this [google sheet](https://docs.google.com/spreadsheets/d/1obGKnWSuQsXNyBUP2h5UOjszPiPgkYk7aVZdRSScnEI/edit#gid=0)
  * File > Make a Copy > Rename it: 'whatever'
    * If you have a saved .xlsx sheet > File > Import > find your .xlsx
    * select > Replace your spreadsheet
* Option 2: copy/paste code.
 * Create a new google sheet > sheets.google.com
 * Tools > Script Editor
 * Copy / Paste entire contents of `crud_v0.0.gs`(found in this repo/folder) or most recent version into code.js(replace any code in text area).

Publish your api
* With your new sheet open > Tools > Script Editor(you may already be there)
* Publish > Deploy as web app > select advanced to authorize > continue to unsafe
  * Select: "Who has access to the app" to > `Everyone, even anonymous`. This is just for the software so it can be accessed programmatically. NOT access to view the google spreadsheet itself. That's still private. 
* Publish > Deploy from minifest > 'web app meta-version' > copy link next to GLOBE
* Paste url into GAS class and go!

---
# API CRUD REQUESTS

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
