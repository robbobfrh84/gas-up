function onOpen() {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu('GAS Up')
    .addItem('Create *Root sheet', 'gasup.createRootSheet')
    .addSeparator()
    .addItem('Create Table', 'gasup.createTable')
    .addItem('Create Grid', 'gasup.createGrid')
    // .addSubMenu(ui.createMenu('[WIP]Extentions')
    //   .addItem('[WIP]Client API Explorer', 'clientAPIExplorer')
    //   .addItem('[WIP]Permissions', 'permissions'))
    .addToUi()
}

function createTable() {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId()
  const table = sheetTriggered_createSheet({ id, type: "table" })
  if (table.error) return SpreadsheetApp.getUi().alert(table.error)
  SpreadsheetApp.getUi().alert('Successfully created table sheet "'+table.sheetName+'"')
}

function createGrid() {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId()
  const grid = sheetTriggered_createSheet({ id, type: "grid" })
  if (grid.error) return SpreadsheetApp.getUi().alert(grid.error)
  SpreadsheetApp.getUi().alert('Successfully created grid sheet "'+grid.sheetName+'"')
}

function createRootSheet() {
  const gsheet = SpreadsheetApp.getActiveSpreadsheet()
  const id = gsheet.getId()

  const rootSheet = sheetTriggered_createSheet({
    type: "table",
    sheetName: "*GAS Up Root",
    keys: "Name,Value",
    id: id
  })
  if (rootSheet.error) return SpreadsheetApp.getUi().alert(rootSheet.error)

  const idRow = api_sheets_db.row.create({
    scope: "row",
    request: "create",
    id: id,
    sheetId: rootSheet.sheetId,
    sheetName: "*GAS Up Root",
    row: JSON.stringify({
      Name: 'Google Sheet Id',
      Value: id
    })
  })
  if (idRow.error) return SpreadsheetApp.getUi().alert(idRow.error)

  const sheet = get_sheet_by_id(gsheet, rootSheet.sheetId)
  sheet.setColumnWidth(2, 200)
  sheet.setColumnWidth(3, 400)

  SpreadsheetApp.getUi().alert('You have created a new GAS Up table sheet! Select the new tab below 👇 to see.')
}
