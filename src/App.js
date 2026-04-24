import { useState, useEffect } from "react"
import "./App.css";
import logo from "./assets/Koala_climbing_tree.jpg"
const API_KEY = "d7k7kvpr01qn1u2ghalgd7k7kvpr01qn1u2gham0"


function App() {
  const[symbol, setSymbol] = useState("")
  const[minutes, setMinutes] = useState("")
  const[seconds, setSeconds] = useState("")
  const[rows, setRows] = useState([])
  const[isTracking, setIsTracking] = useState(false)

  function fetchStock(){
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const newRow = {
        open: data.o,
        high: data.h,
        low: data.l,
        current: data.c,
        previousClose: data.pc,
        time: new Date().toLocaleString()
      }
      setRows(prevRows => [...prevRows, newRow])
    })
    .catch(error => {
      console.error("Error fetching stock data:", error)
    })

  }

  useEffect(() => {
    if (isTracking && symbol) {
      fetchStock()
      const totalMilliseconds = (Number(minutes) * 60 + Number(seconds)) * 1000
      if (totalMilliseconds === 0) return
      const interval = setInterval(fetchStock, totalMilliseconds)
      return () => clearInterval(interval)
    }
  }, [isTracking])

  return (
    <div>
      <h1>Stock Tracker</h1>

      <input type="text" placeholder="Stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <input type="number" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
      <input type="number" placeholder="Seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} />

      <button onClick={() => setIsTracking(true)}>Start Tracking</button>

      <table>
        <thead>
          <tr>
          <th> Open </th>
          <th> High </th>
          <th> Low </th>
          <th> Current </th>
          <th> Previous Close </th>
          <th> Time </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>${row.open.toFixed(2)}</td>
              <td>${row.high.toFixed(2)}</td>
              <td>${row.low.toFixed(2)}</td>
              <td>${row.current.toFixed(2)}</td>
              <td>${row.previousClose.toFixed(2)}</td>
              <td>{row.time}</td>
            </tr>
          ))}
          </tbody>
      </table>
      <img src={logo} alt="Koala climbing tree" />  
    </div>
  
  )
}

export default App