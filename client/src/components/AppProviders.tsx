//import { useState } from 'react'
import '../styles/App.css'
import Stopwatch from './Stopwatch'

function App() {
  

  return (
    <>{/* Probar quitar  items-center o justify-center para aprovechar mas el alto al utilizar en mobile*/}
      <div className="App bg-black h-screen w-screen flex flex-col items-center  p-4">
        <Stopwatch />
      </div>
    </>
  )
}

export default App
