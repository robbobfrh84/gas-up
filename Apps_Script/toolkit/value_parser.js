/*
  This helper will catch all of the values to return and check them...
  for SPECIAL things. Like, if it's a formula to display an image in a
  google sheet. This will make sure to send back RAW string of cell,
  as you would see in the cell with equation and all.
*/

function value_parser(value, formula) {
  if (value.valueType && value.valueType.name() === "IMAGE") {
    if (value.valueType.name() === "IMAGE") {
      return value_parser_handle_images(value, formula)
    }
  }
  return value
}

function value_parser_handle_images(value, formula) {
  return formula
}
