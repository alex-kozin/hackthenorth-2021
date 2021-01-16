import React from "react";
import "../styles/battleSelection.css";

const BattleButton = ({ name, color, active, onClick, selected}) => {

    if(selected){
        return(
            <div class="button-static-box" style={{ backgroundColor: color }} disabled={true}>
                <div class="button-text">{name}</div>
            </div>
        )
    }
    else{
        return (
            <button class="button-box" style={{ backgroundColor: color }} onClick={onClick} disabled={!active}>
              <div class="button-text">{name}</div>
            </button>
          );
    }
};
/**
 * Active: Can we select a battle stat?
 * Selection: Only used when active is false. This sets which stat was selected for battle.
 * HAS TO BE ONE OF : [price, stars, reviews]
 *
 */
const BattleSelection = ({ active, selection, onSelect}) => {

  return (
    <div class="battle-select-container">
      <div class="battle-select-title">Battle On:</div>
      {active ? 
      <div class="battle-select-choices">
        <BattleButton name={"Price"} color={"#024361"} onClick={() => onSelect("price")} active={active}/>
        <BattleButton name={"Stars"} color={"#006917"} onClick={() => onSelect("stars")} active={active}/>
        <BattleButton name={"Reviews"} color={"#690000"} onClick={() => onSelect("reviews")} active={active}/>
      </div> : 
      <div class="battle-select-choices">
        <BattleButton name={"Price"} color={"#024361"} onClick={() => onSelect("price")} active={active} selected={selection==="price"}/>
        <BattleButton name={"Stars"} color={"#006917"} onClick={() => onSelect("stars")} active={active} selected={selection==="stars"}/>
        <BattleButton name={"Reviews"} color={"#690000"} onClick={() => onSelect("reviews")} active={active} selected={selection==="reviews"}/>
      </div> 
      }
    </div>
  );
};

export { BattleSelection };
