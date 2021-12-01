window.onload = () => start()

const start = function() {

  const app = {
    // static: static, // noted-out will fetch Google Sheet's data.
    show: [1,2,3,4,5,6,"hm"],
    animate: false,
    rankHeight: "90px",
    sheetId: "685369503",
    username: "Bob",
    title: "Top 5",
    gasup: new Gasup({
      id: "1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU", // ⭐️ Google Sheet Id.
      // Dev 🟡 👇
      deployId: "AKfycbx2I_khrgqjxp0mJWYhk46mm3q4HF_rKzlVap1EweR1A3V2ybvByhxxnbW1uROD2vdF",
      // Prod 🟢 👇
      // deployId: "AKfycbwtsMtfeQXzBX5qQaXU-lxw_S8iAu35XUnDKr1xJgdqr4ZnGvQxFdX6GED6XqGLhrNHFw",
    })
  }

  app.hash = hash_set("movies") // 🚨 This should be dynamic when move to multi-page!
  build_user_interface(app)

  !app.static ? request.page(app, response.build_page) : response.build_page(app)

}

const hash_set = function(newHash) {
  const hash = newHash || window.location.hash
  window.location.hash = hash
}

const hash_change= function(newHash) {
  const hash = window.location.hash.split("/")
  console.log("hash :", hash)
  window.location.hash = hash[0] + "/"+ newHash
}

const build_user_interface = function(app) {
  document.body.style.opacity = 1
  build_border(app) // 🚧 Argument To eventually be dynamic from Google Sheet
  build_title(app)
}

const setloader = function(loader, lId) {
  loader.on(lId)
  return { loader, lId }
}
