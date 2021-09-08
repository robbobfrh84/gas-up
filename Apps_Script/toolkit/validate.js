function validate(p, fields) { // someday this could go to toolkit. it's universal and not unique to api.
  const missing = []
  if (fields) {
    fields.forEach( field =>{
      if (!p[field]) {
        missing.push(field)
      }
    })
  }
  if (missing.length > 0) {
    return { error: "Missing field(s)", missing: missing }
  }
  const functionName = p.request+"_"+p.scope
  return api_sheets_db[functionName](p)
}
