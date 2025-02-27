import '../styles/main.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded!')
  console.log('App Title:', process.env.APP_TITLE)
  console.log('Welcome Message:', process.env.WELCOME_MSG)
  console.log('Version:', process.env.APP_VERSION)
})
