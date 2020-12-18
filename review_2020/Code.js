function test(param) {
  Logger.log("param")
  Logger.log("param.number", param.number)
  Logger.log("param.name", param.name)
  return {
    msg: "Some data to return",
    name: param.name,
    number: param.number
  }
}

function simpleTest() {
  Logger.log("LOG from simpleTest!")
  return "Return from simpleTest!"
}
