function single_user(e, data) {
  const app = e.parameter.app ? JSON.parse(e.parameter.app) : false
  if (!app) { // check to see that password is included in request
    return { pass: false, error: "💻❌request parameter has no .app data" }
  }

  if (data.publicRequests) {
    const status = singele_user_checkPublicRequests(e, data)
    if (status.pass || status.error) return status
  }

  if (!app.password ) { // check to see that password is included in request
    return { pass: false, error: "🎫💻❌request parameter has no app.password data" }
  }
  if (app.password !== data.password) {
    return { pass: false, error: "🎫❌options.password incorrect." }
  } else {
    return { pass: true, auth: true }
  }
  if (!data.password) {
    return { pass: false, error: "📄❌gas_up_metadata.password not found in sheet." }
  }
}

function singele_user_checkPublicRequests(e, data) {
  const {
    request,
    scope,
    sheetId,
    rowId
  } = e.parameter
  let pass = false
  let error = false

  data.publicRequests.forEach( public => {
    if (public.request === request && public.scope === scope) {

      if (request === "read" && scope === "gsheet") {
        pass = true
      }

      else if (request === "read" && scope === "sheet") {
        const gsheet = api_sheets_db.read_gsheet(e.parameter)
        gsheet.sheets.forEach( sheet => {
          public.sheets.forEach( publicSheet => {
            if ( // Ok, so this order is kinda senative.
              publicSheet.sheetName === sheet.sheetName // We want to make sure the App Script's sheetId and sheetName match! Because, maybe the user put in the wrong ID (like a bad copy/paste)
              && parseInt(sheet.sheetId) === parseInt(sheetId) // Then the requested ID is checked against the Actual list of sheets we have.
            ) {
              if (parseInt(publicSheet.sheetId) != parseInt(sheet.sheetId)) { // BUT, if the id's from request / actual sheet match and the ids from the config's publicSheet don't, let give an error.
                error = "🤼❌Your publicRequest's sheetId in your App Scripts config dosn't match the actual sheet's sheetId."
              } else {
                pass = true
              }
            }
          })
        })
      }

    }
  })

  return { pass, error, auth: false }
}
