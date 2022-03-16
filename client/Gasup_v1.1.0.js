/*
   GAS Up ⛽️ 🚀 VERSION 1.1.0
*/

class Gasup {

  constructor(params) {
    Object.assign(this, params)
    this.baseUrl = "https://script.google.com/macros/s/"+this.deployId+"/exec"
    this.buildQueries({
      requests: ["create","read","update","delete"],
      scopes: ["gsheet","sheet","keys","row","cells"]
    })
  }

  buildQueries({ requests, scopes }) {
    requests.forEach( request => {
      this[request] = {}
      scopes.forEach( scope => {
        this[request][scope] = (options) => {
          options = options || {}
          return this.request({ request, scope, options })
        }
      })
    })
  }

  request( { request, scope, options } ) {
    let url = this.baseUrl + "?request=" + request
    url += "&scope=" + scope
    url += "&id=" + this.id
    if (this.app) { url += "&app=" + JSON.stringify(this.app) }
    url += this.queryString(options)
    return new Promise( (res, rej) => {
      fetch(url)
        .then( payload => payload.json() )
        .then( payload => {
          if (payload.data.error) {
            rej(payload)
          } else {
            res(payload)
          }
        })
        .catch( error => rej(error) )
    })
  }

  queryString(options) {
    const keys = Object.keys(options)
    return "&" + keys.map( key => {
      let value = options[key]
      if (typeof value == "object") { value = JSON.stringify(value) }
      return key+'='+value
    }).join('&')
  }

}
