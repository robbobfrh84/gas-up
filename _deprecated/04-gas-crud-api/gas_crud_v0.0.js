class GAS {

  constructor (url) {
    this.url = url
  }

  crud (action, scope, fields) {
    let params = {}
    return new Promise((res, rej) => {
      params.action = action
      params.scope = scope
      if (fields) params.fields = fields
      params = this.encodeObjURI(params)
      if (params.fields) params.fields = JSON.stringify(params.fields)
      let queryString = '?'+Object.keys(params).map(key => key + '=' + params[key]).join('&')
      console.log('...request '+params.action+': '+params.scope+': queryString: ', queryString);
      this.get(this.url+queryString)
        .then(payload => {
          const obj = payload !== 'undefined' ? JSON.parse(payload) : 'No response data included in Payload'
          console.log(params.action+" "+params.scope+" : 🤓 👉 response data: ", obj)
          res(obj)
        })
        .catch( err => rej(err) )
    })
  }

  get (url) {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            res(xhr.responseText)
          } else {
            rej(xhr)
          }
        }
      }
      xhr.send(null)
    })
  }

  encodeObjURI (obj) {
    let encodedObj = {}
    for (const key in obj) {
      const keyName = encodeURIComponent(key)
      if (typeof obj[key] === 'object' && !this.isArray(obj[key])) {
        encodedObj[encodeURIComponent(key)] = this.encodeObjURI(obj[key])
      } else {
        let field = obj[key]
        if (typeof field !== 'boolean' && typeof field !== 'number' && !this.isArray(obj[key])) {
          field = JSON.stringify(field)
          field = encodeURIComponent(field)
          field = field.split('%22')
          field.pop()
          field.shift()
          field = field.join('%22')
        }
        encodedObj[encodeURIComponent(key)] = field
      }
    }
    return encodedObj
  }

  isArray (a) {
    return (!!a) && (a.constructor === Array);
  }

}
