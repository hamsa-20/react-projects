import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setCounter]=useState(5)

  //let counter=5
  const addValue=()=>{
    //counter=counter+1
    setCounter(counter+1)
    // console.log('CLICKED',counter);
  }
  const removeValue=()=>{
    setCounter(counter-1)
  }

  return (
    <>
      <h1>hi i am react </h1>
      <h2>counter value {counter}</h2>
      <button
      onClick={addValue}
      >add value</button>
      <br/>
      <button
      onClick={removeValue}
      >remove value {counter}</button>
      </>
  )
}

export default App
