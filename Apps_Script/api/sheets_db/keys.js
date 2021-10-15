// * * * * * Keys APIs * * * * *


// ✨ 🔑 CREATE keys 🔑 ✨
api_sheets_db.create_keys = function({ id, sheetId, keys }) {

  const newKeys = do_try(()=>{

    const cleanKeys = clean_keys(keys)
    if (cleanKeys.error) { return { error: cleanKeys.error } }

    const { sheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'keys requests only for sheet type: table' }
    }
    const currentKeys = get_sheet_keys(sheet)
    const duplicates = currentKeys.filter( v => cleanKeys.includes(v) )
    if (duplicates.length > 0) {
      return {
        error: 'key(s) already exist, no new key(s) created',
        duplicate_keys: duplicates,
        valad_keys_requested_not_created: cleanKeys.filter( v => !currentKeys.includes(v) )
      }
    }
    const newKeysCells = sheet.getRange(1,(currentKeys.length+1),1,cleanKeys.length)
    newKeysCells.setValues([cleanKeys])
    return newKeysCells.getValues()[0]
  })
  if (newKeys.error) return newKeys

  return { id, sheetId, keys,
    message: "Successfully created new key(s)",
  }

}


// 📖🔑 READ keys 🔑 📖
api_sheets_db.read_keys = function({ id, sheetId }) {

  const keys = do_try(()=>{
    const { sheet, error } = get_sheets(id, sheetId)
    if (error) return { error } // MUST be destructered, or { error: error }, just error causes bug.
    if (!is_sheet_type(sheet, "table")) {
      return { error: 'keys requests only for sheet type: table' }
    }
    const currentKeys = get_sheet_keys(sheet)
    return currentKeys
  })
  if (keys.error) return keys

  return { id, sheetId, keys,
    message: "Successfully read sheet key(s)",
  }

}


// 🛠🔑 UPDATE keys 🔑 🛠
api_sheets_db.update_keys = function({ id, sheetId }) {
  return { id, sheetId,
    message: "Updating sheet's keys must be done manually within the google sheet itself.",
    sheet_link: "https://docs.google.com/spreadsheets/d/"+id+"/edit#gid="+sheetId
  }
}


// ❌🔑 DELETE keys 🔑 ❌
api_sheets_db.delete_keys = function({ id, sheetId }) {
  return { id, sheetId,
    message: "Deleting sheet's keys must be done manually within the google sheet itself.",
    sheet_link: "https://docs.google.com/spreadsheets/d/"+id+"/edit#gid="+sheetId
  }
}
