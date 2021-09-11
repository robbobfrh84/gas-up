// * * * * * SHEET APIs * * * * *


// * ✨ 🔖 CREATE sheet 🔖 ✨
api_sheets_db.create_sheet = function({ id, sheetName, type, keys }) {

  type = type || "table" // *no type defaults to table
  const resp = is_valad_sheet_type(type)
  if (!resp.valad) { return resp.message } // *response error message if invalad

  if (!sheetName) return { error: "missing sheetName" }

  const sheet = do_try(()=>{
    const gsheet = do_try(()=> SpreadsheetApp.openById(id) )
    if (gsheet.error) return { error: "problem opening gsheet" }
    if ( is_sheetName_taken(gsheet, sheetName) ) {
      return { error: "Sheet name alrady exists", sheetName: sheetName }
    }
    const endTabIndex = gsheet.getSheets().length
    const newSheet = gsheet.insertSheet(sheetName, endTabIndex)
    const newSheetWithNote = add_A1_note_and_keys(newSheet, type, keys)
    return newSheetWithNote
  })
  if (sheet.error) return sheet

  return { id, sheetName,
    message: "Successfully created sheet",
    sheetId: sheet.sheet.getSheetId(),
    sheet_json: sheet.sheet_json,
  }

}


// * 📖 🔖 READ sheet 🔖 📖
api_sheets_db.read_sheet = function({ id, sheetId }) {

  const { sheet, error } = get_sheets(id, sheetId)
  if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.

  const sheetObj = do_try(()=>{
    const values = sheet.getDataRange().getValues()
    const sheet_metaData = get_sheet_A1_metadata(sheet).sheet_metaData
    if ( sheet_metaData && sheet_metaData.type === "table" ) {
      const keys = get_sheet_keys(sheet)
      values.shift()
      const rows = []
      values.forEach( row => {
        rowObj = rowObj_builder(keys, row).row
        rowObj.rowId = rowObj.rowId
        rows.push(rowObj)
      })
      return { keys, rows, sheet_metaData }
    }
    return { sheet_metaData, values }

  })
  if (sheetObj.error) return sheetObj

  return { id, sheetId, ...sheetObj,
    sheetName: sheet.getSheetName(),
    message: "Successfully read sheet",
  }

}


// * 🛠 🔖 UPDATE sheet 🔖 🛠
api_sheets_db.update_sheet = function({ id, sheetId, // REQUIRED
  sheetName, type // *NOTE, add to "fields" 👇
}) {
  const response = {}
  const fields = { sheetName, type  }
  let fieldsCnt = 0
  for (const field in fields) {
    if (fields[field]) fieldsCnt++
  }

  const sheetObj = do_try(()=>{
    if (fieldsCnt === 0) {
      return { error: "No update sheet fields provided" }
    } else if (fieldsCnt > 1) {
      return { error: { fields, fieldsCnt, message: "Only one field can be updated per request" }}
    } else {
      const { sheet, gsheet, error } = get_sheets(id, sheetId)
      if (error) return error
      if (
        // * 📝 UPDATE sheetName!
        fields.sheetName
      ) {
        let oldSheetName
        const newSheetName = do_try(()=>{
          if ( is_sheetName_taken(gsheet, sheetName) ) {
            return { error: "Sheet name alrady exists", sheetName: sheetName }
          }
          oldSheetName = sheet.getSheetName()
          sheet.setName(sheetName)
          return sheet.getSheetName()
        })
        if (newSheetName.error) return newSheetName
        return { oldSheetName, newSheetName }
      } else if (
        // * 🧬 UPDATE type
        fields.type
      ) {
        const a1_note = sheet.getRange("1:1").getNote()
        if (a1_note != "") {
          const { sheet_metaData } = JSON.parse(a1_note)
          if ( sheet_metaData && sheet_metaData.type &&
            ['table','grid'].includes(sheet_metaData.type)
          ) {
            return { error: "Cannot change table and grid types once created. This request is only for sheets without a sheet type. You may need to use manual operations."}
          }
        }
        const resp = is_valad_sheet_type(type)
        if (!resp.valad) { return resp.message } // *response error message
        let empty = is_sheet_empty(sheet)
        if (!empty) {
          return { error: "Sheet must be empty to create new sheet type." }
        }
        const sheetWithNote = add_A1_note_and_keys(sheet, type)
        const metadata = JSON.parse(sheet.getRange("1:1").getNote())
        return {
          sheetName: sheet.getSheetName(),
          sheet_json: metadata,
        }
      }
    }
  })
  if (sheetObj.error) return sheetObj

  return { id, sheetId, ...sheetObj,
    message: "Successfully updated sheet"
  }

}


// * ❌ 🔖 DELETE sheet 🔖 ❌
api_sheets_db.delete_sheet = function({ id, sheetId }) {
  let savedSheetName, savedSheetId

  const response = do_try(()=>{
    const { sheet, gsheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    savedSheetName = sheet.getSheetName()
    savedSheetId = sheet.getSheetId()
    gsheet.deleteSheet(sheet)
    return {}
  })
  if (response.error) return response

  return { id, sheetId, response,
    message: "Successfully deleted sheet",
    sheetName: savedSheetName,
  }

}
