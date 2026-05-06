import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../../../colors_and_type.css'
import './index.css'

const auth = (() => { try { return sessionStorage.getItem('md-auth') } catch { return null } })()

if (!import.meta.env.DEV && !auth) {
  window.location.replace('../../site/login.html')
} else {
  if (!auth) {
    sessionStorage.setItem('md-auth', JSON.stringify({ email: 'dev@minedebug.com.br', t: Date.now() }))
  }
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
