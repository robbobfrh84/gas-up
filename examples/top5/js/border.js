const build_border = function(app) {

  const bg = {
    primary: "#6495ed",
    colors: [
      { col: "#ff4500", w: 6 },
      { col: "#6495ed", w: 6 },
      { col: "#b8860b", w: 6 },
      { col: "#ff00ff", w: 6 },
      { col: "#ffd700", w: 6 },
    ],
    layers: "colors", // "colors" will be equal to number of colors. If you want a different number layers to colors, give intiger here.
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 1px inset rgba(0,0,0,0.5)",
    transition_time: 12, // time for each layer to do a full cycle of all colors.
    transition_spread: 2, // this number devides the delay start. SO, high number the closer the layers are in the transition. Resulting in all layers bunched together around a smiliar point in the transtion.
  }
  bg.layers = bg.layers === "colors" ? bg.colors.length : bg.layers

  const build_border_CSS_animations = function() {
    let styles = ""
    const delay_step = (bg.transition_time/bg.colors.length)/bg.transition_spread
    for (let i = 0; i < bg.layers; i++) {
      const delay = (i*-1)*delay_step
      if (app.animate) {
        styles += /*css*/`
          #layer${bg.layers-i} {
            animation-name: layers;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-direction: reverse;
            animation-delay: ${delay}s;
            animation-duration: ${bg.transition_time}s;
          }
        `
      } else {
        const c = bg.colors[i%bg.colors.length]
        styles += /*css*/`
          #layer${bg.layers-i} {
            background-color: ${c.col};
          }
        `
      }
      styles += "@keyframes layers {"
      const chunk = 100/bg.colors.length
      bg.colors.forEach( (c,i) => {
        styles += `
          ${(chunk*i)}% { background-color: ${c.col} }
        `
      })
      styles += `
        100% { background-color: ${bg.colors[0].col} }
      `
      styles += "}"
    }

    if (window.borderStyles) {
      window.borderStyles.innerText = styles
    } else {
      const styleSheet = document.createElement("style")
      styleSheet.id = "borderStyles"
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)
    }

  }

  const build_border_layers = function() {
    let layers = ""
    let previous_w = 0
    let margin = previous_w
    for (let i = 0; i < bg.layers; i++) {
      const c = bg.colors[i%bg.colors.length]
      layers += /*html*/`
        <div id="layer${i+1}" class="border-layer"
        onclick="frontTitleLayer.click()"
        style="
          top: ${margin}px;
          right: ${margin}px;
          bottom: ${margin}px;
          left: ${margin}px;
          border-radius: ${previous_w}px;
          box-shadow: ${bg.boxShadow};
        "></div>
      `
      previous_w = c.w
      margin += c.w
    }
    disco_border.innerHTML = layers
    return { margin, previous_w }
  }

  const set_background = function(margin, previous_w) {
    disco_border.innerHTML += /*html*/`
      <div class="border-layer" style="
        background: url('gfx/light_grain.png');
        top: ${margin}px;
        right: ${margin}px;
        bottom: ${margin}px;
        left: ${margin}px;
        border-radius: ${previous_w}px;
        box-shadow: ${bg.boxShadow};
        cursor: initial;
      "></div>
    `
  }

  build_border_CSS_animations()
  const { margin, previous_w } = build_border_layers()
  set_background(margin, previous_w)

}
