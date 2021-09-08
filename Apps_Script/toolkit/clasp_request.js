// See clasp.sh file for test lab.
function claspDoGet(queryString){
  const query = {
    queryString: queryString || "",
    parameter: {}
  }
  if (queryString) {
    query.parameter = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  }
  return doGet(query).getContent()
}
