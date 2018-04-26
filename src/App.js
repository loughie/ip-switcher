import React, { Component } from 'react';
import Container from './components/Container';
import Loading from './components/Loading'
import './App.css';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

class App extends Component {
  state = {
    currentAdapter: null,
    adapterList: null,
  }

  componentDidMount() {
    // Requests for adapters and ip information
    ipcRenderer.send('get-active-interface');

    // Responses from requests.
    ipcRenderer.on('interface', (event, reply) => {
      this.setState({ currentAdapter: reply })
    })

    // Requests for adapters and ip information
    ipcRenderer.send('get-interface-list');

    // Responses from requests.
    ipcRenderer.on('interface-list', (event, reply) => {
      this.setState({ adapterList: reply })
    })
  }

  render() {
    const { currentAdapter, adapterList } = this.state
    return (
      <div className="App">
        {currentAdapter && adapterList ?
          <Container
            currentAdapter={currentAdapter}
            adapterList={adapterList}
          />
          :
          <Loading />
        }
      </div>
    );
  }
}

export default App;
