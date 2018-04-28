import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import SideNav from './SideNav'
import SwitchForm from './SwitchForm'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  }
});

class Container extends Component {

  state = {
    selectedAdapter: null,
    adapterList: null,
    loadedConfig: null
  }

  _setDHCP = () => {
    ipcRenderer.send('set-dhcp', 'Wi-Fi');
    // Requests for adapters and ip information
    ipcRenderer.send('get-active-interface');
    console.log('Submitting DHCP');
  }

  _setStatic = (settings) => {
    ipcRenderer.send('set-static', this.state.selectedAdapter || this.props.currentAdapter.name, settings);
    // Requests for adapters and ip information
    ipcRenderer.send('get-active-interface');
    console.log('Submitting Static');
  }

  _loadConfig = (config) => {
    this.setState({ loadedConfig: config })
  }

  _saveConfig = (name, ip, gateway, subnet) => {
    const config = {
      name: name,
      ip: ip,
      gateway: gateway,
      subnet: subnet
    }
    ipcRenderer.send('save-config-entry', config)
  }

  _deleteConfig = (config) => {
    ipcRenderer.send('delete-config-entry', config)
  }

  _changeAdapter = (adapter) => {
    this.setState({ selectedAdapter: adapter })
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <SideNav
          currentAdapter={this.props.currentAdapter}
          adapterList={this.props.adapterList}
          changeAdapter={this._changeAdapter}
          loadConfig={this._loadConfig}
          deleteConfig={this._deleteConfig}
        />
        <SwitchForm
          setDHCP={this._setDHCP}
          setStatic={this._setStatic}
          saveConfig={this._saveConfig}
          loadedConfig={this.state.loadedConfig}
          selectedAdapter={this.state.selectedAdapter || this.props.currentAdapter.name}
        />
      </div>
    );
  }
}

export default Container;
