function get_sheets(id, sheetId) {
  // * NOTE: some methods need both the gsheet and sheet for their operations, this allows you to get both in one method!
  return do_try(()=>{
    const gsheet = do_try(()=> SpreadsheetApp.openById(id) )
    if (gsheet.error) return { error: "problem opening gsheet" }
    const sheet = get_sheet_by_id(gsheet, sheetId)
    if (!sheet) return { error: "no sheet found with id: "+sheetId }
    return { gsheet: gsheet, sheet: sheet }
  })
}

function get_sheet(id,  sheetId) {
  const s = get_sheets(id, sheetId)
  if (s.error) return s
  return get_sheets(id, sheetId).sheet
}

function is_valad_sheet_type(type) {
  if (!['table','grid'].includes(type)) { // Checks for valad sheet type
    return {
      message: {
        error: "Invalad sheet type, try 'grid' or 'table'",
        type: type
      },
      valad: false
    }
  }
  return { valad: true }
}


function add_A1_note_and_keys(newSheet, type, keys) {
  const A1Cell = newSheet.getRange(1, 1)
  const allCells = newSheet.getRange('1:'+newSheet.getMaxRows().toString()) //newSheet.getDataRange()
  if (type === "table") {
    let addKeys = ["rowId"]
    if (keys) {
      let cleanKeys = keys.split(" ").join("").split(",")
      addKeys = addKeys.concat(cleanKeys)
    }
    newSheet.appendRow(addKeys)
    newSheet.setColumnWidth(1, 38)
    allCells.setBackground("#fffff8")
    newSheet.getRange("1:1").setBackground("#ffffc8")
    A1Cell.setBackground("#fee087")
  } else if (type === "grid") { // * ...Could just be "else". I just want to remind that at this point when it was written, it's only other thing is "grid" otherwise it'll return type error.
    allCells.setBackground("#f3fcff")
    A1Cell.setBackground("#bed1f6")
  }
  const sheet_json = JSON.stringify({
    sheet_metaData: { type: type },
    state: {}
  })
  A1Cell.setNote(sheet_json)
  return { sheet: newSheet, sheet_json }
}

function get_sheets_A1_metadata(sheets) {
  const sheetsArr = []
  sheets.forEach( sheet => {
    sheetsArr.push({
      sheetName: sheet.getSheetName(),
      sheetId: sheet.getSheetId(),
      sheet_json: get_sheet_A1_metadata(sheet)
    })
  })
  return sheetsArr
}

function get_sheet_A1_metadata(sheet) {
  const A1Cell = sheet.getRange(1, 1)
  const metaDataNote = A1Cell.getNote()
  return metaDataNote ? JSON.parse(metaDataNote) : ""
}

function get_sheet_by_id(gsheet, sheetId) {
  let catchSheet;
  const sheets = gsheet.getSheets()
  for (const sheet of sheets) {
    if (sheet.getSheetId() === parseInt(sheetId)) {
      catchSheet = sheet
      break
    }
  }
  return catchSheet
}

function is_sheetName_taken(gsheet, sheetName) {
  let sheetNameTaken = false
  const sheets = gsheet.getSheets()
  sheets.forEach( sheet => {
    if (sheet.getSheetName() === sheetName) {
      sheetNameTaken = true
    }
  })
  return sheetNameTaken
}

function is_sheet_type(sheet, type) {
  const a1_note = get_sheet_A1_metadata(sheet)
  if (a1_note == "") return false
  sheet_metaData = a1_note.sheet_metaData
  if (sheet_metaData && sheet_metaData.type !== type) {
    return false
  }
  return true
}

function get_sheet_keys(sheet) {
  const allKeys = sheet.getRange("1:1").getValues()[0]
  let lastIndex = 0
  allKeys.forEach( (key, i) => {
    if (key !== "") {
      lastIndex = i
    }
  })
  const keys = allKeys.splice(0,lastIndex+1)
  return keys
}

function is_sheet_empty(sheet) {
  const values = sheet.getDataRange().getValues()
  let empty = true
  values.forEach( row => { row.forEach( cell => {
    if (cell != "") empty = false
  })})
  return empty
}

/* Potentailly useful methods saved (🔥 MOVE THIS SOMEWHERE ELSE MORE OBVIOUS!?)

### Here's how I was able to make a `sheet` a 4x4 grid when after I Created a new sheet
sheet.deleteRows(4, 996)
sheet.deleteColumns(4, 22)
sheetObj.maxRows = sheet.getMaxRows()
sheetObj.maxColumns = sheet.getMaxColumns()

*/
