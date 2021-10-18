# GAS Up Documentation
Please visit our [wiki](https://github.com/robbobfrh84/gas-up/wiki) for complete documentation.
- Complete URL: [https://github.com/robbobfrh84/gas-up/wiki](https://github.com/robbobfrh84/gas-up/wiki)


...

...

...

...

-----
#### old - to be moved to wiki
-
-
-
-
-
-
----
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

### Setting up the SDK with your client side code
...WIP TO DO!

### Example Request
```javascript
gasup.read.sheet({
  sheetId: "2039567170"
})
  .then( response => console.log(response.data) )
```
- This `resp` will return a javascript object with an array of rows with individual ids.


## Requests Summery
<!-- | scope     | CRUD operations available             |
| --------- | ------------------------------------- |
| gsheet 🗓 | [🔵 read](#read-gsheet--) |
| sheet  🔖 | [🟢 create](#create-sheet--) [🔵 read](#read-sheet--) [🟡 update](#update-sheet--) [🔴 delete](#delete-sheet--) |
| keys   🔑 | [🟢 create](#create-keys--) [🔵 read](#read-keys--) |
| row    🚣 | [🟢 create](#create-row--) [🔵 read](#read-row--) [🟡 update](#update-row--) [🔴 delete](#delete-row--) |
| cells  🦠 | [🔵 read](#read-cells--) [🟡 update](#update-cells--) | -->

<!--
  🚨 WARNING: markdown anchor links are sensitive. Double-check they work if changing
-->

#### gsheet 🗓
| request   | required          | options      | example      |
| --------- | ----------------- | ------------ | ------------ |
| 🔵 read | - | - | [read gsheet](#read-gsheet--) |

#### sheet 🔖
| request   | required          | options      | Example      |
| --------- | ----------------- | ------------ | ------------ |
| 🟢 create    | sheetName     | type | [create sheet](#create-sheet--) |
| 🔵 read      | sheetId       | - | [read sheet](#read-sheet--)
| 🟡 update    | sheetId, +(_1 option_) | type, sheetName | [update sheet](#update-sheet--)
| 🔴 delete    | sheetId | - | [delete sheet](#delete-sheet--)

#### keys 🔑
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | id, sheetName, keys     | type |
| 🔵 read      | id, sheetId       | - |

## row 🚣
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | sheetId, row |  |
| 🔵 read      | ...      |  |
| 🟡 update     | | |
| 🔴 delete     | | |

## cells 🦠
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🔵 read      | ...       | - |
| 🟡 update     | | |


# Examples

## template
<!-- WARNING! TITLE is LINKED, review links when changing -->
- <ins>Required</ins>: __sheetId__("string"), __keys__([array] of "strings"), __rowId__(object)
- <ins>Options</ins>: _no options_
- <ins>Returns</ins>:
- <ins>__NOTE__</ins>: all __keys__ spaces are removed from string value. So, " name of " will become "nameof" as a key value in your sheet.

```javascript
gasup.x.x({

})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```


## read gsheet 🔵 🗓
<!-- WARNING! TITLE is LINKED, review links when changing -->
- <ins>Required</ins>: Only that the gasup SDK is initialized with sheet __id__
- <ins>Options</ins>: _no options_
- <ins>Returns</ins>: `response.data.sheets` includes an array of all sheet's info.
```javascript
gasup.read.gsheet()
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```

----

## create sheet 🟢 🔖
<!-- WARNING! TITLE is LINKED, review links when changing -->
- <ins>Required</ins>
  - __sheetName__ ("string")
- <ins>Options</ins>
  - __type__ ("string"): "table" or "grid" only. Default is "table"
  - __keys__ ([array] of "strings")
- <ins>Returns</ins>: `response.data.sheet_json` includes sheetId and other info about your new sheet.
- <ins>__NOTE__</ins>: You can create keys after creating a sheet.

Example with a default "table"-type sheet.
```javascript
gasup.create.sheet({
  sheetName: "A Cool Default Sheet"
})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```

Example with __type__ option to create a "grid"-type sheet.
```javascript
gasup.create.sheet({
  sheetName: "A Cool Grid Sheet",
  type: "grid"
})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```

Example with __keys__ option to create a "table"-type sheet with keys.
```javascript
gasup.create.sheet({
  sheetName: "A Cool Keys Sheet",
  keys: ["name","color"]
})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```

## read sheet 🔵 🔖
<!-- WARNING! TITLE is LINKED, review links when changing -->
```javascript
gasup.read.sheet({
  sheetId: 350278289
}).then( resp => console.log(resp.data) )
```

## update sheet 🟡 🔖
<!-- WARNING! TITLE is LINKED, review links when changing -->

## delete sheet 🔴 🔖
<!-- WARNING! TITLE is LINKED, review links when changing -->

----

## create keys 🟢 🔑
<!-- WARNING! TITLE is LINKED, review links when changing -->
- <ins>Required</ins>
  - __sheetId__("string"), __keys__([array] of "strings")
- <ins>Options</ins> _no options_
- <ins>__NOTE__</ins>: all __keys__ spaces are removed from string value. So, " name of " will become "nameof" as a key value in your sheet.

```javascript
gasup.create.keys({
  sheetId: "1PGiogqhg1X_lYsN_HeS7m5Fa7oMF12kRmOkBCqZ-Wko", // example value
  keys: ["name", "age"] // example values
})
  .then( response => console.log(response) )
  .catch( error => console.log(error) )
```

## read keys 🔵 🔑
<!-- WARNING! TITLE is LINKED, review links when changing -->
```javascript
gasup.read.keys({
  sheetId: sheetId_inputValue.value,
})
  .then( response => handle_response(response) )
  .catch( err => handle_error(err) )
```

----

## create row 🟢 🚣
<!-- WARNING! TITLE is LINKED, review links when changing -->

## read row 🔵 🚣
<!-- WARNING! TITLE is LINKED, review links when changing -->

## update row 🟡 🚣
<!-- WARNING! TITLE is LINKED, review links when changing -->

## delete row 🔴 🚣
<!-- WARNING! TITLE is LINKED, review links when changing -->

----

## read cells 🔵 🦠
<!-- WARNING! TITLE is LINKED, review links when changing -->

## update cells 🟡 🦠
<!-- WARNING! TITLE is LINKED, review links when changing -->


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
