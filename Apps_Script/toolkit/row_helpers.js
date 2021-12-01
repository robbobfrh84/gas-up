function rowObj_builder(keys, range, formulas) {
  let id_index
  const row = {}
  const indices = {}
  keys.forEach( (key, i) => {
    if (key !== "") {
      const value = value_parser(range[i], formulas[i])
      row[key] = value
      range[i] = value
      indices[key] = i
    }
    if (key === "rowId") id_index = i
  })
  return { id_index, row, range, indices }
}

function get_all_row_data(gsheet, sheet, sheetId, rowId) {
  const rowAll = do_try(()=> gsheet.getRangeByName(rowId))
  if (!rowAll) return { data_error: "Can't find row with this rowId."} // Needs to be call data_error, because error is likely used before this func is called.

  const rows_sheetId = rowAll.getSheet().getSheetId()
  if (sheetId != rows_sheetId) return { data_error: "Invalad sheetId, rows sheetId does not match." }

  const range = do_try(()=> rowAll.getValues()[0])
  if (range.error) return { data_error: "Can't find row range/values."} // Needs to be call data_error, because error is likely used before this func is called.
  const rangeFormulas = do_try(()=> rowAll.getFormulas()[0])
  if (rangeFormulas.error) return { data_error: "Can't find row range/formulas."} // Needs to be call data_error, because error is likely used before this func is called.

  const keys = get_sheet_keys(sheet)
  const rowObj = rowObj_builder(keys, range, rangeFormulas)
  const note = sheet.getRange(rowAll.getRow(), rowObj.id_index+1)
  return { rowAll, range: rowObj.range, rowObj, note }
}

function row_json_builder({ rowId, createdAt, appendTo }) {
  return {
    row_metaData: {
      rowId: rowId,
      created: createdAt,
      modified: createdAt,
      appendTo: appendTo
    },
    state: {}
  }
}

function make_row_from_keys(rowObj, keys, cellId) {
  const newRow = { idColumn: 0, row: [] }
  newRow.row = keys.map( (key, i) => {
    if (key === "rowId") {
      newRow.idColumn = i
      return cellId
    } else if (rowObj[key] || rowObj[key] === false) {
      return rowObj[key]
    }
    return ""
  })
  return newRow
}

function make_rowArr_obj_with_keys(keys, row) {
  const obj = {}
  keys.forEach( (k,i) => obj[k] = row[i] )
  return obj
}

// * 📝 I stopped using this becauses I .gs is blocking and
//   this "guess" faie safe at best. IDK. ok to delete if you want?
// function rowId_conflict(cellId, cellValue, lastRowIdCell, lastRow) {
//   if (cellId !== cellValue) {
//     lastRowIdCell.setValue("!CONFLICT "+cellId+" AND "+cellValue)
//     lastRow.setBackground("#fdd")
//     return true
//   }
//   return false
// }
