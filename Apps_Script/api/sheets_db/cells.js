// * * * * * CELLS APIs * * * * *


// * ✨ ‍🦠 ♀️CREATE cells 🦠 ‍✨
api_sheets_db.create_cells = function({ id, sheetId }) {
  return { id, sheetId,
    message: "Use update grid for creating sheet grid cells.",
    sheet_link: "https://docs.google.com/spreadsheets/d/"+id+"/edit#gid="+sheetId
  }
}


// * 📖 ‍🦠 READ cells ‍🦠 📖
api_sheets_db.read_cells = function({ id, sheetId, cells }) {

  const value = do_try(()=>{
    const { sheet, error } = get_sheets(id, sheetId)
    if (error) return error
    if (!is_sheet_type(sheet, "grid")) {
      return { error: 'Cells requests only for sheet type: grid' }
    }

    let cellsValues;
    if (cells.split(',').length == 4 ) {
      const c = cells.split(',')
      cellsValues = do_try(()=> sheet.getRange(c[0],c[1],c[2],c[3]).getValues() )
    } else {
      cellsValues = do_try(()=> sheet.getRange(cells).getValues() )
    }
    if (cellsValues.error) return { error: "cells read range formatting error" }

    if (cellsValues.length == 1 && cellsValues[0].length == 1) {
      cellsValues = cellsValues[0][0]
    }

    return cellsValues
  })
  if (value.error) return value

  return { id, sheetId, value,
    message: "Successfully read cells",
  }

}

// * 🛠 ‍🦠 UPDATE cells ‍🦠 🛠
api_sheets_db.update_cells = function({ id, sheetId, cells, value }) {

  const values = do_try(()=>{
    const { sheet, error } = get_sheets(id, sheetId)
    if (error) return error
    if (!is_sheet_type(sheet, "grid")) {
      return { error: 'Cells requests only for sheet type: grid' }
    }
    let previousValue = this.read_cells({ id, sheetId, cells })
    if (previousValue.error) return previousValue
    previousValue = cells_valueParse(previousValue.value)

    const currentValue = cells_valueParse(value)
    if ( (typeof currentValue == "string" && typeof previousValue == "string")
      || (cells_arraysMatch(currentValue, previousValue))
    ) {
      let newValue;
      const setValue = typeof currentValue == "string" ? [[currentValue]] : currentValue
      if (cells.split(',').length == 4 ) {
        const c = cells.split(',')
        newValue = do_try(()=> sheet.getRange(c[0],c[1],c[2],c[3]).setValues(setValue))
      } else {
        newValue = do_try(()=> sheet.getRange(cells).setValues(setValue))
      }
      if (newValue.error) return { error: "set value formatting error" }
    } else {
      return { error: "cell range dosn't match."}
    }

    return { currentValue, previousValue }
  })
  if (values.error) return values

  return { id, sheetId,
    message: "Successfully updated cells",
    currentValue: values.currentValue,
    previousValue: values.previousValue
  }

}

// * ❌ ‍🦠 DELETE cells ‍🦠 ❌
api_sheets_db.delete_cells = function({ id, sheetId }) {
  return { id, sheetId,
    message: "Use update grid for delete sheet grid cells.",
    sheet_link: "https://docs.google.com/spreadsheets/d/"+id+"/edit#gid="+sheetId
  }
}
