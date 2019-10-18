var _gas = new GAS('https://script.google.com/macros/s/AKfycbz2hXyBWRjO16TouwCsujXEMbfd94mkTpCU10IR-zz7eoPAfYlw/exec')

window.onload = ()=>{
  let setPage = window.location.hash
  setPage = setPage.split('#')[1]
  if (setPage) _page(setPage)
  _set_year_to_footer(document.getElementById('my-custom-footer'))

  _gas.crud( "READ" , "all")
    .then( payload => { console.log('do stuff with data!')})
    .finally( () => { console.log('turn off loader') })

}

_set_year_to_footer = (footer)=>{
  const year = new Date
  footer.innerHTML = /*html*/`
    <div> &copy; ${year.getFullYear()} Bob Main </div>
  `
}
