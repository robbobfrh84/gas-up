function authentication(e) {
  const metadata = authentication_getMetadata(SpreadsheetApp.openById(e.parameter.id))

  if (!metadata) { // this is a fail safe. It should always return an empty array at least.
    return { pass: false, error: "📑❌gas_up_metadata not found in google sheet."}
  }

  if (!metadata[0]) { // We have metaData, but has anything been created yet?
    return { pass: false, error: ""
      + "0️⃣❌gas_up_metadata length is 0. Authentication hasn't been set up for "
      + "this app. Try opening this app's gsheet to trigger an authentication build."
    }
  }

  if ( metadata.length > 1) {
    return { pass: false, error: "Uh oh😱! 🚨 More than 1 metaData mean security breach."}
  }

  const data = JSON.parse(metadata[0].getValue())

  if (!data.type) {
    return { pass: false, error: "🎨❌gas_up_metadata.type not found in sheet." }
  }

  if (data.type === "public") {
    return { pass: true, auth: false }
  } else if ( data.type === "single_user" ) {
    return single_user(e, data)
  } else if ( data.type === "users") {
    return users(e, data)
  } else {
    return { pass: false, error: "🎨❌gas_up_metadata unknown .type: " + data.type }
  }

}


function authentication_check() { // Used in _onOpen.js
  const gsheet = SpreadsheetApp.getActiveSpreadsheet()
  const metadata = authentication_getMetadata(gsheet)
  if (metadata && metadata.length < 1) {
    console.log(" * Creating gas_up_metadata for this.config: ", this.config)
    SpreadsheetApp.getActive().addDeveloperMetadata(
      "gas_up_metadata",
      JSON.stringify(this.config.gas_up_metadata)
    )
  }
}


function authentication_getMetadata(gsheet) {
  return gsheet.getDeveloperMetadata().filter( data => {
    if (data.getKey() === "gas_up_metadata") {
      return data
    }
  })
}
