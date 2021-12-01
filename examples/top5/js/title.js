const build_title = function(app) {

  const title = {
    name: app.title,
    primary: "#6495ed", // NOT  included.
    colors: [
      { col: "yellow", w: 4 },
      // { col: "#6495ed", w: 4 },
      { col: "orange", w: 4 },
      { col: "red", w: 4 },
      { col: "pink", w: 4 },
    ],
    layers: "colors", // "colors" will be equal to number of colors. If you want a different number layers to colors, give intiger here.
    transition_time: 3, // time for each layer to do a full cycle of all colors.
    transition_spread: 3, // this number devides the delay start. SO, high number the closer the layers are in the transition. Resulting in all layers bunched together around a smiliar point in the transtion.
    make_opacity: (layers, i) => { return (0.75/layers)*i+0.05 },
  }
  title.layers = title.layers === "colors" ? title.colors.length : title.layers

  const build_title_CSS_animations = function() {
    let styles = ""
    const delay_step = (title.transition_time/title.colors.length)/title.transition_spread
    for (let i = 0; i < title.layers; i++) {
      const delay = (i*-1)*delay_step
      if (app.animate) {
        styles += /*css*/`
          #title${i+1} {
            animation-name: titles;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-direction: reverse;
            animation-delay: ${delay}s;
            animation-duration: ${title.transition_time}s;
          }
        `
      } else {
        const c = title.colors[i%title.colors.length]
        styles += /*css*/`
          #title${i+1} {
            color: ${c.col};
          }
        `
      }
    }
    styles += "@keyframes titles {"
    const chunk = 100/title.colors.length
    title.colors.forEach( (c,i) => {
      styles += `
        ${(chunk*i)}% { color: ${c.col} }
      `
    })
    styles += `
      100% { color: ${title.colors[0].col} }
    `
    styles += "}"

    if (window.titleStyles) {
      window.titleStyles.innerText = styles
    } else {
      const styleSheet = document.createElement("style")
      styleSheet.id = "titleStyles"
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)
    }

  }

  const build_title = function() {
    let layers = ""
    let margin = []
    for (let i = 0; i < title.layers; i++) {
      const m = margin.length < 2 ? 0 : margin[0]
      margin.unshift(m+title.colors[i%title.colors.length].w)
    }
    for (let i = 0; i < title.layers; i++) {
      const c = title.colors[i%title.colors.length]
      const opacity = title.make_opacity(title.layers, i)
      layers += /*html*/`
        <div id="title${i+1}" class="title-layer"
          style="
            color: ${c.col};
            top: -${margin[i]}px;
            left: -${margin[i]}px;
            opacity: ${opacity};
          ">${title.name}</div>
      `
    }
    centered_title.innerHTML = /*html*/`
      <div id="title_allLayers">
        ${layers}
        <div>${title.name}</div> <!-- For some reason, it needs this to hold the "shape" -->
      </div>
    `
    const frontTitleLayer = document.createElement('div')
    frontTitleLayer.id = "frontTitleLayer"
    frontTitleLayer.innerHTML = title.name
    frontTitleLayer.classList.add("title-layer")
    frontTitleLayer.style.color = title.primary
    frontTitleLayer.onclick = function() {
      app.animate = !app.animate
      build_user_interface(app)
    }
    title_allLayers.appendChild(frontTitleLayer)

  }

  build_title_CSS_animations()
  build_title()

}
