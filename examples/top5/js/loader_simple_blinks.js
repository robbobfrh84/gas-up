/* SETUP

Div to add at end of body (no duplicate class names)
  <div id="loader1" class="_loader-small-centered-container"><div><div></div><div></div><div></div></div></div>
  <div id="loader2" class="_loader-small-centered-container"><div><div></div><div></div><div></div></div></div>

Add Script after body
  <script src="loader_simple__blinks.js"></script>

----
Turn on in JS >
  _loader.on("loader1") // pass elm id, so you can do multiple loaders
  _loader.on("loader2") // pass elm id, so you can do multiple loaders

Turn off in JS >
  _loader.off("loader1") // pass elm id, so you can do multiple loaders
  _loader.off("loader2") // pass elm id, so you can do multiple loaders

*/

const _loader2 = {
  state: "off",

  on: function(id) {
    window[id].style.display = "block"
    window[id].style.opacity = 1
    this.state = "on"
  },

  off: function(id) {
    window[id].style.opacity = 0
    this.state = "off"
    setTimeout(()=>{
      if (this.state == "off") {
        window[id].style.display = "none"
      }
      else {
        window[id].style.opacity = 1
        window[id].style.display = "block"
      }

    }, 1000)
  }

}

;(function(){
  const styles = `
    ._loader-small-centered-container {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    ._loader-small-centered-container > div {
      font-size: 0px;
    }
    ._loader-small-centered-container > div > div {
      display: inline-block;
      border-radius: 2px;
      width: 15px;
      height: 15px;
      margin: 2px;
    }
    ._loader-small-centered-container > div > div:nth-child(1) {
      background-color: cornflowerblue;
      animation: fade 1.2s infinite;
    }
    ._loader-small-centered-container > div > div:nth-child(2) {
      background-color: firebrick;
      animation: fade 1.2s infinite;
      animation-delay: 0.4s;
    }
    ._loader-small-centered-container > div > div:nth-child(3) {
      background-color: darkgoldenrod;
      animation: fade 1.2s infinite;
      animation-delay: 0.8s;
    }
    @keyframes fade {
      0% { opacity: 1; }
      50% { opacity: 0.1; }
      100% { opacity: 1; }
    }
  `

  const styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)

})();
