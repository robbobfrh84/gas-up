var _oldPage = 'home'

_page = (page)=>{
  const newPage = document.getElementById('page-'+page)
  try {
    document.getElementById('page-'+_oldPage).style.display = 'none'
    newPage.style.display = 'block'
    window.location.hash = '#'+page
    _oldPage = page
  }
  catch(error) {
    alert(`
      So... this "${page}" page doesn't exist. It may have,
      it may will, or it's may never exist.

      What we're gonna do is send you back to the last page you
      were on. If this was it, we'll send you to the home page.
    `)
    _page(_oldPage)
  }
  window.scrollTo(0,0) // 👈 resets page scroll bar to the top of the page.
}

window.onhashchange = ()=>{
  let setPage = window.location.hash
  setPage = setPage.split('#')[1]
  _page(setPage)
}
