import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Input from './form/Input'

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '50px'
  },
  formHolder: {
    width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  }
});

class SwitchForm extends Component {

  state = {
    ipAddress: null,
    gateway: null,
    subnet: null,
    configName: null,
    isSaving: false,
    loadedConfig: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadedConfig) {
      this.setState({
        loadedConfig: nextProps.loadedConfig,
        ipAddress: nextProps.loadedConfig.ip,
        gateway: nextProps.loadedConfig.gateway,
        subnet: nextProps.loadedConfig.subnet,
        configName: nextProps.loadedConfig.name
      })
    }
  }

  _setIp = (value) => { this.setState({ ipAddress: value }) }
  _setSubnet = (value) => { this.setState({ subnet: value }) }
  _setGateway = (value) => { this.setState({ gateway: value }) }
  _setSaveName = (value) => { this.setState({ configName: value }) }

  // Submits form with object
  _submitForm = (settings) => {
    this.props.setStatic(settings);
  }

  _toggleSaveMode = () => {
    this.setState({
      isSaving: !this.state.isSaving,
      loadedConfig: null,
    })
  }

  _submitSave = () => {
    this.props.saveConfig(this.state.configName, this.state.ipAddress, this.state.gateway, this.state.subnet);
  }

  _deleteConfig = () => {
    this.props.deleteConfig(this.state.configName, this.state.ipAddress, this.state.gateway, this.state.subnet);
  }

  render() {
    const { ipAddress, gateway, subnet, configName, isSaving } = this.state

    const interfaceSettings = [
      ipAddress,
      gateway,
      subnet,
    ]

    const saveInterface = [
      configName,
      ...interfaceSettings
    ]

    console.log(this.state.ipAddress);

    return (
      <div className={css(styles.formContainer)}>
        <div className={css(styles.formHolder)}>
          {(this.state.isSaving || this.state.loadedConfig) &&
            <Input
              label="Config Name"
              setValue={this._setSaveName}
              value={this.state.configName}
            />
          }
          <Input
            label="IP Address"
            setValue={this._setIp}
            value={this.state.ipAddress}
          />
          <Input
            label="Gateway"
            setValue={this._setGateway}
            value={this.state.gateway}
          />
          <Input
            label="Subnet"
            setValue={this._setSubnet}
            value={this.state.subnet}
          />
          {!this.state.isSaving &&
            <div>
              <button onClick={() => { this._submitForm(interfaceSettings) }}>Submit</button>
              <button onClick={this.props.setDHCP}>Set DHCP</button>
              <button onClick={this._toggleSaveMode}>Save</button>
              <button onClick={this._deleteConfig}>Delete</button>
            </div>
          }
          {(this.state.isSaving) &&
            <div>
              <button onClick={this._toggleSaveMode}>Cancel</button>
              <button onClick={this._submitSave}>Save Config</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SwitchForm;
