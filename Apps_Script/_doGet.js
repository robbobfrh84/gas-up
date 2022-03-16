function doGet(e) {

  if (e.parameter.app) {
    console.log(" * 🖐Request from app: ", e.parameter.app)
  }

  const request = e.parameter.request // Examples: ["create", "read", "update", "delete"]
  const scope = e.parameter.scope     // Examples: ["gsheet", "sheet", "keys", "row", "cells"]

  // Check to see if this is a valad CRUD API request.
  if (api_sheets_db[scope] && api_sheets_db[scope][request]) {
    const auth = authentication(e)
    if (!auth.pass) {
      return asJSON(e, "invalad", auth)
    }
    const requestEvent = api_sheets_db[scope][request](e.parameter)
    if (requestEvent.error) {
      return asJSON(e, "invalad", requestEvent)
    }
    requestEvent.auth = auth
    return asJSON(e, "valad", requestEvent)
  } else if (e.queryString === "") { // If the query is empty. Let's send some special data about GAS Up Resources.
    return rootResponseAsJSON(e)
  } else { // Or, if the request is invalad, we'll send helpful info.
    return asJSON(e, "invalad")
  }

}

function asJSON(e, type, requestEvent) {

  let obj = {
    gas_up_request: "Unknown request",
    request: e.parameter.request || "",
    scope:  e.parameter.scope || "",
    your_queryString: e.queryString,
    data: requestEvent
  }

  if (type === "valad") {
    obj.gas_up_request = "✨ Valad request"
  } else if (type === "invalad") {
    let message = "NOT a valad request"
    if (requestEvent && requestEvent.error) {
      message = requestEvent.error || "something went wrong 🙁"
    }
    obj.gas_up_request = message
  }

  if (e.parameter.testInScriptEditor) {
    return obj
  } else {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
  }

}

function rootResponseAsJSON() {

  const obj = {
    name: "GAS Up",
    gas_up_github: "https://github.com/robbobfrh84/gas-up",
  }

  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
