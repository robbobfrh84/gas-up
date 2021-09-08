// * * * * * ROW APIs * * * * *


// * ✨ 🚣‍ ♀️CREATE row 🚣 ‍✨
api_sheets_db.create_row = function({ id, sheetId, row, appendTo }) {
  appendTo = appendTo || "bottom"

  const newRow = do_try(()=>{
    const { sheet, gsheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'Row requests only for sheet type: table' }
    }
    if (appendTo && !["top","bottom"].includes(appendTo)) {
      return { error: 'appendTo must be either top or bottom, you requested: '+appendTo }
    }

    const rowObj = JSON.parse(decodeURIComponent(row))
    const keys = get_sheet_keys(sheet)
    const unknownKeys = Object.keys(rowObj).filter( key => !keys.includes(key) ) // *filter unknown keys to ignore.
    if (unknownKeys.length > 0) {
      return { error: 'Unknown keys in request', unknownKeys: unknownKeys }
    }
    const createdAt = Date.now()
    const rowId = id_generator(null, createdAt)
    const newRow = make_row_from_keys(rowObj, keys, rowId)
    let idCell, newRowRange

    if (appendTo == "top") {
      sheet.insertRowBefore(2)
      newRowRange = sheet.getRange("2:2")
      const values = newRowRange.getValues()
      newRow.row.forEach( ( v,i ) => { values[0][i] = v } )
      newRowRange.setValues(values)
      idCell = sheet.getRange(2,1)
    } else { // * aka appendTo == "bottom"
      sheet.appendRow(newRow.row)
      const lastRowNum = sheet.getLastRow()
      idCell = sheet.getRange(lastRowNum, newRow.idColumn+1)
      newRowRange = sheet.getRange(lastRowNum+":"+lastRowNum)
    }
    newRowRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)

    idCell.setFontColor("#aaa")
    const metaData = row_json_builder({ rowId, createdAt, appendTo })
    idCell.setNote(JSON.stringify(metaData))
    gsheet.setNamedRange(rowId, newRowRange)

    const newRowObj = make_rowArr_obj_with_keys(keys, newRow.row)
    return { rowObj: newRowObj, row_json: metaData }

  })
  if (newRow.error) return newRow

  return { id, sheetId,
    message: "Successfully created row",
    row: newRow,
    rowId: newRow.rowObj.rowId,
  }

}


// * 📖 🚣 READ row 🚣 📖
api_sheets_db.read_row = function({ id, sheetId, rowId }) {

  const row = do_try(()=>{
    const { gsheet, sheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'Row requests only for sheet type: table' }
    }
    const { rowObj, note, data_error } = get_all_row_data(gsheet, sheet, sheetId, rowId)
    if (data_error) return { error: data_error }
    return { rowObj: rowObj.row, row_json: JSON.parse(note.getNote()) }
  })
  if (row.error) return row

  return { id, sheetId, row, rowId,
    message: "Successfully read row",
  }

}


// * 🛠 🚣 UPDATE row 🚣 🛠
api_sheets_db.update_row = function({id, sheetId, rowId, row}) {
  row = JSON.parse(decodeURIComponent(row))

  const updatedRow = do_try(()=>{
    const { sheet, gsheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'Row requests only for sheet type: table' }
    }
    const { rowAll, range, rowObj, note, data_error } = get_all_row_data(gsheet, sheet, sheetId, rowId)
    if (data_error) return { error: data_error }

    const noKeys = Object.keys(row).filter( key => !Object.keys(rowObj.row).includes(key) )
    if (noKeys.length > 0) {
      return { error: "requested key(s) don't exist.", keys: noKeys }
    }

    const updatedArr = range
    Object.keys(row).map( (key, index) => {
      updatedArr[rowObj.indices[key]] = row[key]
    })
    rowAll.setValues([updatedArr])

    const getNote = JSON.parse(note.getNote())
    const saveNote = JSON.parse(note.getNote()) // setting this to getNote didn't work because it's mutable.
    getNote.row_metaData.modified = Date.now()
    note.setNote(JSON.stringify(getNote))

    return {
      data_error: data_error,
      currentRow: this.read_row({ id, sheetId, rowId }).row,
      previousRow: { rowObj: rowObj.row, row_json: saveNote }
    }
  })
  if (updatedRow.error) return updatedRow

  return { id, sheetId, rowId,
    message: "Successfully updated row",
    currentRow: updatedRow.currentRow,
    previousRow: updatedRow.previousRow,
  }

}

// * ❌ 🚣 Delete row 🚣 ❌
api_sheets_db.delete_row = function({ id, sheetId, rowId }) {

  const row = do_try(()=>{
    const { gsheet, sheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'Row requests only for sheet type: table' }
    }
    const { rowAll, range, rowObj, note, data_error } = get_all_row_data(gsheet, sheet, sheetId, rowId)
    if (data_error) return { error: data_error }
    gsheet.removeNamedRange(rowId)
    const rowIndexToDelete = rowAll.getRow()
    sheet.deleteRow(rowIndexToDelete)
    return {}
  })
  if (row.error) return row

  return { id, sheetId, rowId,
    message: "Successfully deleted row ",
  }

}
