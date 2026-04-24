import {useState, useEffect} from 'react'
import "./App.css"
import logo2 from "./assets/candy.jpg"
const API_KEY2 = "d7k7kvpr01qn1u2ghalgd7k7kvpr01qn1u2gham0"

export default function App2(){
    const[symbol, setSymbol] = useState("")
    const[minus, setMins] = useState("")
    const[seconds, setSeconds] = useState("")
    const[rows, setRows] = useState([])
    const[tracking, setTracking] = useState(false)

    function fetchStock(){
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY2}`)
        .then(response => response.json())
        .then(data => {
            const newRow = {
                open: data.o,
                high: data.h,
                low: data.l,
                time: new Date().toLocaleString()
            }
            setRows(prevRows => [...prevRows, newRow])
    })
        .catch(error => console.error("Error fetching stock data:", error))
    }

    useEffect (() => {
        if (tracking && symbol){
            fetchStock()
            const millisecs = Number(minus) + Number(seconds)*1000
            if (millisecs === 0) return
            const interv = setInterval(fetchStock, millisecs)
            return () => clearInterval(interv)
        }
    }, [tracking])

    return (
        <div> 
            <h1> Stock Tracker</h1>
            <input type = "text" placeholder="Stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            <input type = "number" placeholder="add minutes" value={minus} onChange={(e) => setMins(e.target.value)} />
            <input type = "number" placeholder="add seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} />

            <button onClick={() => setTracking(true)}> Start Tracking </button>

            <table>
                <thead> 
                    <tr>
                    <th> Open </th>
                    <th> High </th>
                    <th> Low </th>
                    <th> Time </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row,index) => (
                        <tr key={index}>
                            <td> ${row.open.toFixed(2)} </td>
                            <td> ${row.high.toFixed(2)} </td>
                            <td> ${row.low.toFixed(2)} </td>
                            <td> {row.time} </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <img src={logo2} alt="candy" />
                </div>
                
                    







    )






}

        