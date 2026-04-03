import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SmartDashboard from './SmartDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",     
        justifyContent: "center", 
        height: "100vh"         
      }}
    >
      <SmartDashboard />
    </div>

  )
}

export default App
