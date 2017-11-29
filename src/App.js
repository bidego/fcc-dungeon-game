import React, { Component } from 'react';
import logo from './logo.svg';
import dungeonGenerator from 'random-dungeon-generator';
import './App.css';

// Configuracion de constantes globales

const DUNGEON_CONFIG = {
  width: 50,
  height: 50,
  minRoomSize: 5,
  maxRoomSize: 20
}
const TILES = [ ]
const MOVE_KEYS = [
  {}
]
// Fin config

const overMapCell = (dungeon,fn) =>
  dungeon.map( (row, rowIndex) => 
    row.map( (cell, cellIndex ) => 
      fn(cell, rowIndex, cellIndex)
    )
  )

const normalizeDungeon = dungeon =>
  overMapCell(dungeon, cell =>
    cell === 1 ? cell : (Math.random()*10<9.975) ? 0 : 2
  )

const findFirstEmptyPosition = dungeon => {
  var rowNumber;
  var cellNumber;
  overMapCell(dungeon, (cell, rowIndex, cellIndex) => {
    if(cell === 0 && rowNumber === undefined) {
      rowNumber = Math.floor( rowIndex / DUNGEON_CONFIG.width )
      cellNumber = cellIndex % DUNGEON_CONFIG.width
    }
  })
  return [ rowNumber, cellNumber ]
}
  

class App extends Component {
  constructor() {
    super()

    const dungeon = normalizeDungeon(dungeonGenerator(DUNGEON_OPTIONS))

    this.state = {
      dungeon: dungeon,
      playerPosition: findFirstEmptyPosition(dungeon),
      food: []
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.dungeon.map((row, rowIndex) => (
          <div className="dungeon-row">
            {row.map( cell => <div className={`dungeon-cell ${ (cell===0) ? 'empty' : (cell===1)?'wall':'food' }`} />)}
          </div>
        ))}
        {this.state.playerPosition}
      </div>
    );
  }
}

export default App;