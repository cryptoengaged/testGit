import './App.css';
import React, { useState } from "react"
import Graph from './graph';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
function App() {
  const[selectedDate, setSelectedDate] = useState(null)
  return (
    <div>
    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
   
    <Graph/>
  
    </div>
    
    
    );
    }

export default App;
