/* - - - - - NOTES: API, Sheets DB - - - - -
- `handle_request.js` is the function that calls this.
- "p" is the parameters of query sting
- "validate" function takes "p" and checks that keys/values exits in array.
  - The specifc API function is then dynamically called using "p" values.
*/
const api_sheets_db = { // CRUD ✨📖🛠❌
  gsheet: { //🗓
    create: p => validate(p, []), // MANUAL GSHEET ACTION: will only tell you that
    read:   p => validate(p, [ "id" ]), // Example id: 1a4xYsRpj0hB2K1VU3AQA32HkIlptaz5o1Sq3-9ogDVU
    update: p => validate(p, []), // MANUAL GSHEET ACTION: will only tell you that
    delete: p => validate(p, []) // MANUAL GSHEET ACTION: will only tell you that
  },
  sheet: { // 🔖
    create: p => validate(p, [ "id" ]),
    read:   p => validate(p, [ "id", "sheetId" ]),
    update: p => validate(p, [ "id", "sheetId" ]),
    delete: p => validate(p, [ "id", "sheetId" ])
  },
  keys: { // 🔑 NOTE: initial keys for db(with "_id") created with create sheet only.
    create: p => validate(p, [ "id", "sheetId", "keys" ]),
    read:   p => validate(p, [ "id", "sheetId" ]),
    update: p => validate(p, [ "id", "sheetId" ]), // MANUAL GSHEET ACTION: will only tell you that
    delete: p => validate(p, [ "id", "sheetId" ]) // MANUAL GSHEET ACTION: will only tell you that
  },
  row: { // 🚣‍
    create: p => validate(p, [ "id", "sheetId", "row" ]),
    read:   p => validate(p, [ "id", "sheetId", "rowId" ]),
    update: p => validate(p, [ "id", "sheetId", "rowId", [ "row", "type" ] ]), // arrays validate to only 1 to be required
    delete: p => validate(p, [ "id", "sheetId", "rowId" ]),
  },
  cells: { // 🦠
    create: p => validate(p, [ "id", "sheetId" ]), // Return message only, use Update for grid type sheets.
    read:   p => validate(p, [ "id", "sheetId", "cells" ]),
    update: p => validate(p, [ "id", "sheetId", "cells", "value" ]),
    delete: p => validate(p, [ "id", "sheetId" ]) // Return message only, use Update for grid type sheets.
  }
}
