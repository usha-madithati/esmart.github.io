import React from 'react'
import '../Login/Login.css'

export default function Login() {
  return (
    <section className='login-section'>
      <div className="container">
        <form class="form">
          <span class="signup">Sign Up</span>
          <input type="email" placeholder="Email address" class="form--input" />
          <input type="password" placeholder="Password" class="form--input" />
          <input type="password" placeholder="Confirm password" class="form--input" />

          <div class="form--marketing">
            <input id="okayToEmail" type="checkbox" />
            <label for="okayToEmail" class="checkbox">
              I want to join the newsletter
            </label>
          </div>
          <button class="form--submit">
            Sign up
          </button>
        </form>
      </div>
    </section>
  )
}
