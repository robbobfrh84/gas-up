function clean_keys(keys) {

  let cleanKeys = ""

  try {
    cleanKeys = keys.split(" ").join("").split(",")
  } catch(error) {
    return { error: 'The keys value is not formatted correctly, your value -> '+keys+' <-' }
  }

  try {
    cleanKeys = JSON.parse(cleanKeys)
  } catch(error) {
    return { error: 'The keys value must come in the form of an array with double-quoted string values ["stringKey","otherKey"]' }
  }

  return cleanKeys
}
