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
    cell === 1 ? cell : 0
  )

const loadDungeonElements = (dungeonMap, playerPosition) =>
  overMapCell(dungeonMap, (cell, rowIndex, colIndex) => {
    if(cell === 1) return cell
    if(playerPosition[0] === rowIndex && playerPosition[1] === colIndex)
      return 2
    if(Math.random()*10<9.975)
      return 0
    else return 3
  })
const findFirstEmptyPosition = dungeon => {
  var rowNumber;
  var cellNumber;
  overMapCell(dungeon, (cell, rowIndex, colIndex) => {
    if(cell === 0 && rowNumber === undefined) {
      rowNumber = rowIndex
      cellNumber = colIndex
    }
  })
  return [ rowNumber, cellNumber ]
}
  

class App extends Component {
  constructor() {
    super()

    const emptyDungeon = normalizeDungeon(dungeonGenerator(DUNGEON_CONFIG))
    const initPlayerPosition = findFirstEmptyPosition(emptyDungeon)
    const loadedDungeon = loadDungeonElements(emptyDungeon, initPlayerPosition)

    this.state = {
      dungeon: loadedDungeon,
      playerPosition: initPlayerPosition,
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.dungeon.map((row, rowIndex) => (
          <div className="dungeon-row">
            {row.map( cell => <div className={`dungeon-cell ${ (cell===0) ? 'empty' : (cell===1)?'wall': (cell===2)? 'player': 'food' }`} />)}
          </div>
        ))}
        {this.state.playerPosition}
      </div>
    );
  }
}

export default App;