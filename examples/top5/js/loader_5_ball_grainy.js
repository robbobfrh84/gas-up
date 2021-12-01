/* SETUP

Div to add at end of body
  <div id="loader1" class="_loader-fullscreen-over"></div>

Add Script after body
  <script src="loader_5_ball_grainy.js"></script>

----
Turn on in JS >
  _loader.on("loader1") // pass elm id, so you can do multiple loaders

Turn off in JS >
  _loader.off("loader1") // pass elm id, so you can do multiple loaders

*/


loader1.innerHTML = /*html*/`
  <div class="_loader-centered">
    <div class="_loader-sLoader">
      <div></div> <div></div> <div></div> <div></div> <div></div>
    </div>
  </div>
`

const _loader = {
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

const styles = `
  #loader1 {
    opacity: 0;
    display: none;
    transition: opacity 1s;
  }
  ._loader-fullscreen-over {
    position: absolute;
    top: 0px; bottom: 0px; left: 0px; right: 0px;
    background-color: rgba(0,0,0,0.5);
  }
  ._loader-centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ._loader-sLoader {
    width: 400px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
  ._loader-sLoader > div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: inset 4px 4px 2px rgba(255,255,255,0.4), 2px 2px 2px rgba(0,0,0,0.6);
  }
  ._loader-sLoader > div:nth-child(1) {
    width: 70px;
    height: 70px;
    animation: bouncing 0.4s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95);
    background-color: cornflowerblue;
    background: url(gfx/beige_paper_cornflowerblue.png);
    opacity: 0.8;
  }
  ._loader-sLoader > div:nth-child(2) {
    width: 60px;
    height: 60px;
    animation: bouncing 0.4s 0.1s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
    background-color: firebrick;
    background: url(gfx/beige_paper_firebrick.png);
    opacity: 0.8;
  }
  ._loader-sLoader > div:nth-child(3) {
    width: 50px;
    height: 50px;
    animation: bouncing 0.4s 0.2s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
    background: url(gfx/beige_paper_green.png);
    opacity: 0.8;
  }
  ._loader-sLoader > div:nth-child(4) {
    width: 40px;
    height: 40px;
    animation: bouncing 0.4s 0.3s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
    background: url(gfx/beige_paper_darkgoldenrod.png);
    opacity: 0.8;
  }
  ._loader-sLoader > div:nth-child(5) {
    width: 30px;
    height: 30px;
    animation: bouncing 0.4s 0.4s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
    background: url(gfx/beige_paper_purple.png);
    opacity: 0.8;
  }

  @keyframes bouncing {
    0% {
      transform: translate3d(0, 40px, 0) scale(1.2, 0.85);
    }
    100% {
      transform: translate3d(0, -20px, 0) scale(0.9, 1.1);
    }
  }
`

const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
