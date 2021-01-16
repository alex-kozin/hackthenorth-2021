import React, {useState, useEffect}from 'react';

import {BattleSelection} from "./components/BattleSelection";
import {PlayerHand} from "./components/PlayerHand";

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
      <BattleSelection active={selectionActive} selection={selectedBattle} onSelect={onSelectBattle}/>
      <PlayerHand active={handActive} cards={CARDS} onSelect={onSelectCard}/>
    </div>
  )
}

export default App;
