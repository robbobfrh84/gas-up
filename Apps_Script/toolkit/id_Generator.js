function id_generator(length, timeStamp) {
  const default_length = 8
  length = length || default_length
  let s = ''
  let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i=0; i < length; i++) {
    s += r.charAt(Math.floor(Math.random()*r.length))
  }
  const time = timeStamp || Date.now()
  return "r_"+s+'_'+time.toString(36)
}
