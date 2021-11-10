function startWorkflow() {
  console.log("startWorkflow()")
  return false
}

function checkWorkflow() {
  console.log("checkWorkflow()")
  return false
}

function createTable() {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId()
  const table = menuTriggered_createSheet({ id, type: "table" })
  if (table.error) return SpreadsheetApp.getUi().alert(table.error)
  SpreadsheetApp.getUi().alert('Successfully created table sheet "'+table.sheetName+'"')
}

function createGrid() {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId()
  const grid = menuTriggered_createSheet({ id, type: "grid" })
  if (grid.error) return SpreadsheetApp.getUi().alert(grid.error)
  SpreadsheetApp.getUi().alert('Successfully created grid sheet "'+grid.sheetName+'"')
}

function createRootSheet() {
  const gsheet = SpreadsheetApp.getActiveSpreadsheet()
  const id = gsheet.getId()

  const rootSheet = menuTriggered_createSheet({
    type: "table",
    sheetName: "*GAS Up Root",
    keys: JSON.stringify(["name","value"]),
    id: id
  })
  if (rootSheet.error) return SpreadsheetApp.getUi().alert(rootSheet.error)

  const idRow = api_sheets_db.row.create({
    scope: "row",
    request: "create",
    id: id,
    sheetId: rootSheet.sheetId,
    row: JSON.stringify({
      name: 'google_sheet_id',
      value: id
    })
  })
  if (idRow.error) return SpreadsheetApp.getUi().alert(idRow.error)

  const sheetLinkRow = api_sheets_db.row.create({
    scope: "row",
    request: "create",
    id: id,
    sheetId: rootSheet.sheetId,
    row: JSON.stringify({
      name: 'sheet_link',
      value: 'https://docs.google.com/spreadsheets/d/'+id+'/edit#gid='+rootSheet.sheetId
    })
  })
  if (idRow.error) return SpreadsheetApp.getUi().alert(idRow.error)

  const sheet = get_sheet_by_id(gsheet, rootSheet.sheetId)
  sheet.setColumnWidth(2, 200)
  sheet.setColumnWidth(3, 400)

  SpreadsheetApp.getUi().alert('You have created a new GAS Up table sheet! Select the new tab below 👇 to see.')
}

function menuTriggered_createSheet({ sheetName, type, keys, id }) {
  if (!sheetName) {
    const ui = SpreadsheetApp.getUi()
    sheetName = ui.prompt("Sheet name?").getResponseText()
  }
  const request = { sheetName, type, id,
    scope: "sheet",
    request: "create",
  }
  if (keys) request.keys = keys
  return api_sheets_db.sheet.create(request)
}
