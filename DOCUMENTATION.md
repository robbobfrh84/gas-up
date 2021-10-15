# GAS Up: CRUD API Documentation
Here, you'll find the complete GAS Up client-side javascript documentation for modifying Google Sheets.
- The API is structured so that the Google Sheets behave like a Simple database.
- This consists of the following __scopes__...

  - __gsheet__ 🗓: The highest scope level represents the entire google sheet. where only _read_ requests are applied to return a summer of sheets(tabs) within the google sheet.

  - __sheet__ 🔖: the default __GAS Up__-type sheet acts like a table in a database, with a key row and ids for each entry. _All_ CRUD operations can be achieved on a table sheet.

  - __keys__ 🔑: The first row of a table sheet, which designates the name for the values of entries in that column. Keys can only be _created_ an _read_ with the api.

  - __row__ 🚣: The data entries for a sheet table, names of values corrisponding with key row. Generated with a unique id. _All_ CRUD operations can be achieved on a row.

  - __cells__ 🦠: the cell scope can only be used on grid-type sheets, which are more free form and ridged. Due to the nature of the scope, only _read_ and _update_ requests are needed.

**Requires**: [Gasup.js](https://github.com/robbobfrh84/gas-up/blob/master/client/Gasup.js) library file to be included in `<head>` of your .html file.

### Example Request
```javascript
gasup.read.sheet({
  sheetId: "2039567170"
})
  .then( response => console.log(response.data) )
```
- This `resp` will return a javascript object with an array of rows with individual ids.


## Requests Summery
| scope     | CRUD operations available             |
| --------- | ------------------------------------- |
| gsheet 🗓 | 🔵 read |
| sheet  🔖 | 🟢 create 🔵 read 🟡 update 🔴 delete   |
| keys   🔑 | [🟢 create](#create-) [🔵 read](#read-keys) |
| row    🚣 | 🟢 create 🔵 read 🟡 update 🔴 delete   |
| cells  🦠 | 🔵 read 🟡 update |


## gsheet 🗓
| request   | required          | options      | example      |
| --------- | ----------------- | ------------ | ------------ |
| 🔵 read | id | - | [read gsheet](#read-gsheet) |

## sheet 🔖
| request   | required          | options      | Example      |
| --------- | ----------------- | ------------ | ------------ |
| 🟢 create    | id, sheetName     | type | [create sheet](#create-sheet) |
| 🔵 read      | id, sheetId       | - |
| 🟡 update     | | |
| 🔴 delete     | | |

## keys 🔑
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | id, sheetName, keys     | type |
| 🔵 read      | id, sheetId       | - |

## row 🚣
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | ...     |  |
| 🔵 read      | ...      |  |
| 🟡 update     | | |
| 🔴 delete     | | |

## cells 🦠
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🔵 read      | ...       | - |
| 🟡 update     | | |


# Examples

### read gsheet
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
🟢 🗓

----

### create sheet
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
🟢 🔖

```javascript
gasup.create.sheet({
  sheetName: "A Cool Sheet"
}).then( resp => console.log(resp.data) )
```

### read sheet <!-- Warn! this is a linked title, review links emojis don't work -->
🔵 🔖

```javascript
gasup.read.sheet({
  sheetId: 350278289
}).then( resp => console.log(resp.data) )
```

### update sheet
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
🟡 🔖

### delete sheet
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
🔴 🔖

----

# create 🟢
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
- <u>Required</u>: __id__("string"), __sheetId__("string"), __keys__([array] of "strings")
- <u>Options</u>: _no options_
- <u>__NOTE__</u>: all __keys__ indexes' spaces are removed from string value. " name of " will become "nameof" as a key value in your sheet.


```javascript
gasup.create.keys({
  sheetId: "1PGiogqhg1X_lYsN_HeS7m5Fa7oMF12kRmOkBCqZ-Wko", // example value
  keys: ["name", "age"] // example values
})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```
### read keys
<!-- Warn! TITLE is LINKED, review links emojis don't work -->
🔵 🔑

```javascript
gasup.read.keys({
  sheetId: sheetId_inputValue.value,
})
  .then( response => handle_response(response) )
  .catch( err => handle_error(err) )
```

----

### create rows <!-- Warn! this is a linked title, review links emojis don't work -->
🟢 🚣

### read row <!-- Warn! this is a linked title, review links emojis don't work -->
🔵 🚣

### update row <!-- Warn! this is a linked title, review links emojis don't work -->
🟡 🚣

### delete row <!-- Warn! this is a linked title, review links emojis don't work -->
🔴 🚣

----

### update cells <!-- Warn! this is a linked title, review links emojis don't work -->
🟡 🦠

### read cells <!-- Warn! this is a linked title, review links emojis don't work -->
🔵 🦠

----
# Error Handling
To handle errors, you'll just need to simply add the `.then` error callback after the response callback.

```javascript
gasup.read.sheet({
  sheetId: "2039567170"
})
  .then( response => console.log(response) )
  .then( err => console.log(error))
```
- This `resp` will return a javascript object with an array of rows with individual ids.

----
# Anatomy of a GAS Up API url request.

This javascript client-side SDK request generates a GET url request that would look something like the following.
- `https://script.google.com/macros/s/<projectId>/exec?request=read&scope=sheet&id=<id>&sheetId=<sheetId>`

To work, you'd have to replace the following with **your** specific ids into the url example above.
- `<projectId>`: your deployed Google Apps Script project Id
- `<id>`: The id of the Google Sheet (can be found in sheet's url)
- `<sheetId>`: The sheet id (tab) of the Google Sheet (can also be found in sheet's url)


----

# Saving raw SDK Examples to document...
```javascript

gasup.read.gsheet()
  .then( resp => console.log("gsheet: ", resp.data.sheets))

gasup.read.sheet({
  sheetId: "*"
}).then(
  resp => console.log('resp: ', resp)
)

gasup.read.sheet({ // ❌ error
  sheetId: "*e"
}).then(
  resp => console.log('resp: ', resp),
  error => console.error(error) // ❌ error handler
)

gasup.read.sheet({
  sheetId: "2039567170"
}).then(
  resp => {
    console.log(" - keys :", resp.data.keys)
    console.log(' - rows: ', resp.data.rows)
  }
)

gasup.read.row({
  sheetId: "2039567170",
  rowId: "r_caGQj5b2_kstgevot"
}).then(
  resp => {
    console.log(" ~~ row :", resp.data.row)
  }
)

gasup.create.row({
  sheetId: "2039567170",
  rowId: "r_caGQj5b2_kstgevot",
  row: {
    name: "new promise SDK",
    age: "37"
  }
}).then(
  resp => {
    console.log(" ~_~ row :", resp.data.row)
  }
)
```
