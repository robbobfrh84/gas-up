var _landing = document.getElementById('page-landing')

_landing.innerHTML = `

  <div class="landing">
    <div class="sign signin">
      <img src="gfx/cog.svg" class='icon1'>
      <span class="signin-text">
        Sign in
      </span>
    </div>
    <div class="sign signup">
      Sign UP
    </div>
    <div class='landing-title' onclick='_page("home")'>DRAFT'EMS</div>
  </div>

`
