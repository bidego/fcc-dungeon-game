import React, { Component } from 'react';
import logo from './logo.svg';
import dungeonGenerator from 'random-dungeon-generator';
import './App.css';

const normalizeDungeon = dungeon => {
  return dungeon.map(row => {
      return row.map(cell => {
      if (cell ===1 ) return cell;
      return 0;
    })
  })
}

class App extends Component {
  constructor() {
    super()

    const newDungeon = dungeonGenerator({
      width: 50,
      height: 50,
      minRoomSize: 5,
      maxRoomSize: 20
    });

    this.state = {
      dungeon: normalizeDungeon(newDungeon),
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.dungeon.map((row, rowIndex) => (
          <div className="dungeon-row">
            {row.map( cell => <div className={`dungeon-cell ${ (cell===0) ? 'empty' : 'wall' }`} />)}
          </div>
        ))}
      </div>
    );
  }
}

export default App;