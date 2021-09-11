function doGet(e) {

  const request = e.parameter.request // Examples: ["create", "read", "update", "delete"]
  const scope = e.parameter.scope     // Examples: ["gsheet", "sheet", "keys", "row", "cells"]

  // Check to see if this is a valad CRUD API request.
  if (api_sheets_db[scope] && api_sheets_db[scope][request]) {
    const requestEvent = api_sheets_db[scope][request](e.parameter)
    if (requestEvent.error) {
      return asJSON(e, "invalad", requestEvent)
    }
    return asJSON(e, "valad", requestEvent)
  }
  // If the query is empty. Let's send some special data about GAS Up Resources.
  else if (e.queryString === "") {
    return rootResponseAsJSON(e)
  }
  // Or, if the request is invalad, we'll send helpful info.
  else {
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
    obj.gas_up_request = "Valad request"
  } else if (type === "invalad") {
    let message = "NOT a valad request"
    if (requestEvent && requestEvent.error) {
      message = "something went wrong 🙁"
    }
    obj.gas_up_request = message
  }

  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

function rootResponseAsJSON(e) {

  const obj = {
    name: "GAS Up",
    gas_up_github: "https://github.com/robbobfrh84/gas-up",
  }

  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
