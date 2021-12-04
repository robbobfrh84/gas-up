function validate(p, fields) {
  const missing = []
  if (fields) {
    fields.forEach( field =>{
      if (!p[field]) {
        if (Array.isArray(field)) {
          // arrays validate to only 1 to be required
          const m = []
          field.forEach( f => {
            if (!p[f]) { m.push(f) }
          })
          if (m.length == field.length) {
            missing.push(field)
          }
        } else {
          missing.push(field)
        }
      }
    })
  }
  if (missing.length > 0) {
    return { error: "Missing field(s)", missing: missing }
  }
  const functionName = p.request+"_"+p.scope
  return api_sheets_db[functionName](p)
}
