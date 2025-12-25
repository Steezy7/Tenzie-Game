import React from "react"
import "./App.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
Confetti

export default function App(){

const [dice, setDice] = React.useState(() => allNewDice());
const [time, setTime] = React.useState(0)
const [started, setStarted] = React.useState(false)
const timeRef = React.useRef(null)


 var gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

 function hold(id){

  setDice(prevDice =>
    prevDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    )
  );
  if (!started){
    setStarted(true)
  }
 }

 React.useEffect(() => {
  if (started && !timeRef.current) {
    timeRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }

  if (gameWon) {
    clearInterval(timeRef.current);
    timeRef.current = null;
  }
}, [dice, started]);


 function rollDice(){
    setDice(prevDice =>
      prevDice.map(die =>
        die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) }
  )
);
 }

 function newGame(){
  clearInterval(timeRef.current);
  timeRef.current = null;
  setTime(0);
  setStarted(false);
  setDice(allNewDice);
 }

  // Function to generate an array of 10 random dice values
  function allNewDice() {
  
    return new Array(10)
      .fill(0)
      .map(()=>({ 
        value:Math.ceil(Math.random()* 6), 
        isHeld:false,
        id: nanoid()
        }))
  }

  const reference = React.useRef(null)

  const Dice =  dice.map((num)=><Die key={num.id} number={num.value} id={num.id} hold={hold} state={num.isHeld}/>)

  React.useEffect(()=>{
    if (gameWon && reference.current){
      reference.current.focus()
    }
      }, [gameWon])
    

  return(
    <main className="hello">
      {gameWon && <Confetti/>}
      <div aria-label="polite" className="sr-only">
        {gameWon && <p>Congratualtions, you won. Ptress new game to start new game</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <div className="timer" ref ={reference}>{time}</div>
      <p className="instruction">Roll untill all dice are te same. Click each die to freeze it at its current value between rolls.</p>
      <section className="grid">
        {Dice}
      </section>
      <button className="roll-button" onClick={gameWon ? newGame : rollDice} ref= {reference}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}