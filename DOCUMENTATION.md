# GAS Up: CRUD API Documentation

**Requires**: GAS Up Javascript SDK. See: [setting up SDK](bla.js)

### Example Request (Client-side Javascript)
```javascript
gasup.read.sheet({
  sheetId: "2039567170"
}).then(
  resp => console.log('resp: ', resp)
)
```
This javascript client-side SDK request would generate a GET url request that would look something like the following.
- `https://script.google.com/macros/s/<projectId>/exec?request=read&scope=sheet&id=<id>&sheetId=<sheetId>`

To work, you'd have to replace the following with **your** specific ids into the url example above.
- `<projectId>`: your deployed Google Apps Script project Id
- `<id>`: The id of the Google Sheet (can be found in sheet's url)
- `<sheetId>`: The sheet id (tab) of the Google Sheet (can also be found in sheet's url)

### Requests Summery
| scope     | CRUD operations available             |
| --------- | ------------------------------------- |
| sheets    | 🔵 Read |
| sheet     | 🟢 Create 🔵 Read 🟡 Update 🔴 Delete   |
| keys      | 🟢 Create 🔵 Read |
| row       | 🟢 Create 🔵 Read 🟡 Update 🔴 Delete   |
| cells     | 🔵 Read 🟡 Update |


### sheets
| request   | required          | options      | example      |
| --------- | ----------------- | ------------ | ------------ |
| 🔵 read | id | - | [link](#read-sheets) |

### sheet
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | id, sheetName     | type |
| 🔵 read      | id, sheetId       | - |
| 🟡 update     | | |
| 🔴 delete     | | |

### keys
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | id, sheetName     | type |
| 🔵 read      | id, sheetId       | - |

### row
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🟢 create    | ...     |  |
| 🔵 read      | ...      |  |
| 🟡 update     | | |
| 🔴 delete     | | |

### cells
| request   | required          | options      |
| --------- | ----------------- | ------------ |
| 🔵 read      | ...       | - |
| 🟡 update     | | |


# read sheets
