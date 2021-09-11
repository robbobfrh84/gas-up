// See clasp.sh file for tests.
function _testOnly_claspDoGet(queryString){
  const query = {
    queryString: queryString || "",
    parameter: {}
  }
  if (queryString) {
    query.parameter = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  }
  return doGet(query).getContent()
}
