function do_try(request){
  let response;
  try {
    response = request()
  } catch (error) {
    return {
      error: error,
      response: response || "no response"
    }
  }
  return response
}
