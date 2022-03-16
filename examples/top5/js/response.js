const response = {

  build_page: function(app, rows) {
    if (rows) { console.log(" * \n\n"+JSON.stringify(rows)+"\n\n" ) }
    rows = rows || app.static.movies.rows
    rank_page.innerHTML = ""
    rows.forEach( (row, i) => page_rank_builder(app, row,i) )
  },

}

const page_rank_builder = function(app, row, i) {
  let doBuild = true

  if (row.poster[0] == "=") {
    row.poster = row.poster.split('"')[1]
  }

  if (!app.show.includes(row.rank)) {
    doBuild = false
  }

  if (doBuild) {
    const title = /*html*/`
      <div class="rank-card_title"><div>
        <div class="rank-card_title_font">
          ${row.title}
        </div>
      </div></div>
    `

    const rankCard = document.createElement("div")
    rankCard.id = "rankCard"+i
    rankCard.classList.add("rank-card")
    rankCard.onclick = () => hash_change(row.title)
    rankCard.style.opacity = 0
    rankCard.innerHTML += /*html*/`

      ${title}

      <div class="rank-card_table">
        <table>
          <colgroup>
            <col style="width: 28%;" />
            <col style="width: 28%;" />
            <col style="width: 28%;" />
            <col style="width: 16%;" />
          </colgroup>
          <tr class="rank-card_table-tr">
            <th class="rank-card_table-year">
              <div><div>year: ${row.year}</div></div>
            </th>
            <th class="rank-card_table-amazon">
              <div>
                <a href="${row.amazon}" target="_none">
                  <div> watch: </div>
                  <img src="gfx/amazon_icon.png" alt="Amazon Icon"/>
                </a>
              </div>
            </th>
            <th class="rank-card_table-tweet">
              <div>
                <a href="${row.tweet}" target="_none">
                  <div> argue: </div>
                  <img src="gfx/twitter_icon.svg" alt="Twitter Icon"/>
                </a>
              </div>
            </th>
          </tr>
        </table>
      </div>

      <div class="rank-card_rank">
        <div>
          <span>#</span><span>${row.rank}</span>
        </div>
      </div>

      <div class="rank-card_poster">
        <img src="${row.poster}" alt="${row.title} move poster">
      </div>

    `

    rank_page.appendChild(rankCard)
    setTimeout(function() {
      rankCard.style.opacity = 1
      rankCard.style.width = "600px"
      rankCard.style.height = app.rankHeight
      rankCard.querySelector(".rank-card_title_font").style.fontSize = "25px"
      rankCard.querySelector(".rank-card_table").style.fontSize = "18px"
    },200*i)
  }

}
