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
  {
    code: 37,
    positionFunc: pos => [pos[0], pos[1] - 1]
  },
  {
    code: 38,
    positionFunc: pos => [pos[0] - 1, pos[1]]
  },
  {
    code: 39,
    positionFunc: pos => [pos[0], pos[1] + 1]
  },
  {
    code: 40,
    positionFunc: pos => [pos[0] + 1, pos[1]]
  }
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
  overMapCell(dungeonMap, (cell, rowIndex, colIndex) =>
    (cell === 1) ? cell :
      (playerPosition[0] === rowIndex && playerPosition[1] === colIndex) ? 2 :
        (Math.random()<.9965) ? 0 :
          (Math.random()<0.3) ? 3 : 4
  )

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

    this.handleMovement = this.handleMovement.bind(this)
  }

  handleMovement(event) {
    const keyCode = event.keyCode;
    const currentMove = MOVE_KEYS.find(m => m.code === keyCode);
    if (!currentMove) return;
  
    this.movePlayer(
      currentMove.positionFunc(this.state.playerPosition)
    );
  }
  movePlayer(position) {
    this.setState( {
      playerPosition: [position[0], position[1]]
    })
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleMovement} tabIndex="1">
        {this.state.dungeon.map((row, rowIndex) => (
          <div className="dungeon-row">
            {row.map( cell => <div className={`dungeon-cell ${ (cell===0) ? 'empty' : (cell===1)?'wall': (cell===2)? 'player': (cell===3) ?'food' : 'enemy' }`} />)}
          </div>
        ))}
        {this.state.playerPosition}
      </div>
    );
  }
}

export default App;