const sheetTriggered = {

  create_row: function({
    gsheet, idCell, currentTime, rowRangeArr, rowRange, columnIdIndex
  }) { // * input in a new row, but NOT in the rowId Column.
    const rowId = id_generator(null, currentTime)
    rowRangeArr[0][columnIdIndex] = rowId
    rowRange.setValues(rowRangeArr)
    rowRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    gsheet.setNamedRange(rowId, rowRange)
    const metaData = row_json_builder({
      rowId, createdAt: currentTime, appendTo: "manual"
    })
    idCell.setNote(JSON.stringify(metaData))
    idCell.setFontColor("#aaa")
  },

  update_row: function({ idCell, currentTime }) {
    const note = JSON.parse(idCell.getNote())
    note.row_metaData.modified = currentTime
    idCell.setNote(JSON.stringify(note))
  },

  delete_row: function({ gsheet, sheet, rowIndex, idCell }) {
    const note = JSON.parse(idCell.getNote())
    gsheet.removeNamedRange(note.row_metaData.rowId)
    sheet.deleteRow(rowIndex)
  },

  unknown_rowId: function({ rowRangeArr, columnIdIndex, rowRange }) { // unknown input in rowId column, in an empty row.
    let message = "The row Id is automatically generated when new row inputs are detected."
    message += "\n\n!Are you sure you want to manually create a rowId?"
    const ui = SpreadsheetApp.getUi()
    const response = ui.alert(message, ui.ButtonSet.YES_NO)
    const confirm = response == ui.Button.YES ? true : false
    if (!confirm) {
      rowRangeArr[0][columnIdIndex] = ""
      rowRange.setValues(rowRangeArr)
    }
  },
}



function sheetTriggered_cellInput(e) {
  const range = e.range
  const rowIndex = range.getRow()

  if (rowIndex != 1) { // * NOT key row.
    const gsheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = gsheet.getActiveSheet()
    const rowRange = gsheet.getRange(rowIndex+":"+rowIndex)
    const rowRangeArr = rowRange.getValues()
    const keys = gsheet.getRange("1:1").getValues()[0]
    const columnIdIndex = keys.indexOf("rowId")
    const rowIdValue = rowRangeArr[0][columnIdIndex]
    const idCell = sheet.getRange(rowIndex,columnIdIndex+1)

    if (columnIdIndex == range.getColumn() - 1) { // * IS rowId column
      if (rowIdValue == "del") {
        sheetTriggered.delete_row({ gsheet, sheet, rowIndex, idCell })
      } else if (e.oldValue) {
        sheetTriggered.unknown_rowId({ rowRangeArr, columnIdIndex, rowRange })
      }
    } else {
      const currentTime = Date.now()
      if (rowIdValue == "") {
        sheetTriggered.create_row({
          gsheet, idCell, currentTime, rowRangeArr, rowRange, columnIdIndex
        })
      } else {
        sheetTriggered.update_row({ idCell, currentTime })
      }
    }

  }
}
