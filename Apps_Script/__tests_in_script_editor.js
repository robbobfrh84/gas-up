/* ...PLEASE...READ...ALL...OF...THIS...FIRST
  🚨 Making changes in Script Editor and saving will be...
  ...OVERRODE if you deploy clasp changes without `clasp pull` first
  - That's true for custom bash commands like `bob deploy`...
  AND, When deploying changes from clasp, you'll need to hard refresh here...
  BUT, make sure to to pull & deploy in clasp if you want to test changes you've made HERE!
*/

function test_readSheet() {

  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'sheet',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
    }
  })

  console.log("response: ", response)

}

function test_createRow() {

  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'create',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      row: JSON.stringify({
        rank: 90,
        poster: '=IMAGE("https://storage.googleapis.com/gasup/top5/bob/jurassic_park.jpg")'
      }),
    }
  })

  console.log("response: ", response)

}

function test_readRow() {

  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      rowId: 'r_OWWhc0AF_kw5jdy9w',
    }
  })

  console.log("response: ", response.data.row)

}

function test_updateRow() {

  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'update',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      rowId: 'r_ma5BVlFc_kw2hu8pr',
      row: JSON.stringify({
        rank: 13,
      }),
    }
  })

  console.log("response: ", response)

}

function test_readCells() {

  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'cells',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '1225106489',
      cells: 'A1:B2',
    }
  })

  console.log("response: ", response.data)

}
