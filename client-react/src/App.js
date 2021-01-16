import React, {useState, useEffect}from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

import {BattleSelection} from "./components/BattleSelection";
import {PlayerHand} from "./components/PlayerHand";
import {VersusHeader} from "./components/VersusHeader";

import './App.css';

const TEST_IMAGE = "https://images-na.ssl-images-amazon.com/images/I/71XThblib4L._AC_SX679_.jpg";

const CARDS = [
  {name: "Vacuum", price: 100, stars: 4.7, reviews:722, image:TEST_IMAGE},
  {name: "Vacuum", price: 100, stars: 4.7, reviews:722, image:TEST_IMAGE},
  {name: "Vacuum", price: 100, stars: 4.7, reviews:722, image:TEST_IMAGE},
  {name: "Vacuum", price: 100, stars: 4.7, reviews:722, image:TEST_IMAGE},
  {name: "Vacuum", price: 100, stars: 4.7, reviews:722, image:TEST_IMAGE}
]
const App = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  const [selectedBattle, setSelectedBattle] = useState("")
  const [selectionActive, setSelectionActive] = useState(true)
  const [handActive, setHandActive] = useState(false)
  const [cardSelected, setCardSelected] = useState({})

  const onSelectBattle = (selection) => {
    setSelectedBattle(selection);
    setSelectionActive(false);
    setHandActive(true);
  }

  const onSelectCard = (selection) => {
    setCardSelected(selection);
    setSelectionActive(true);
    setHandActive(false);
  }

  return (
    <div>
      <p>Response: {response}</p>
      <VersusHeader username={"USERNAME"} opponentName={"OPPONENT"}/>
      <BattleSelection active={selectionActive} selection={selectedBattle} onSelect={onSelectBattle}/>
      <PlayerHand active={handActive} cards={CARDS} onSelect={onSelectCard}/>
    </div>
  )
}

export default App;
