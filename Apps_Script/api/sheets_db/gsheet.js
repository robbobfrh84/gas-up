// * * * * * GSHEET APIs * * * * *


// * ✨ 🗓 CREATE gsheet 🗓 ✨
api_sheets_db.create_gsheet = function() {

  return {
    message: "Creating a google sheet must be done manually. However, i can be done by implimenting the SpreadsheetApp.create method.",
    google_sheets_link: " https://docs.google.com/spreadsheets/u/0/",
    implementation_reference: "https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#create(String)",
  }

}


// * 📖 🗓 READ gsheet 🗓 📖
api_sheets_db.read_gsheet = function({ id }) {

  const gsheet = do_try(()=> SpreadsheetApp.openById(id) )
  if (gsheet.error) return { error: "problem opening gsheet. ID may be incorrect" }

  const sheets = gsheet.getSheets()
  return { id,
    message: "Successfully read gsheet",
    name: gsheet.getName(),
    sheets: get_sheets_A1_metadata(sheets) // Added to A1 cell if its a "table" which is also default
  }

}


// * 🛠 🗓 UPDATE gsheet 🗓 🛠
api_sheets_db.update_gsheet = function() {

  return {
    message: "Updating a google sheet must be done manually. However, implementation_reference link for more info.",
    google_sheets_link: " https://docs.google.com/spreadsheets/u/0/",
    implementation_reference: "https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app",
  }

}


// * ❌ 🗓 DELETE gsheet 🗓 ❌
api_sheets_db.delete_gsheet = function() {

  return {
    message: "Deleting a google sheet must be done manually by finding your google sheet in your google drive. However, this could be done programmatically by implimenting the Google Drive API",
    google_sheets_link: " https://docs.google.com/spreadsheets/u/0/",
    implementation_reference: "https://developers.google.com/drive/api/v3/reference/files/delete",
  }

}
