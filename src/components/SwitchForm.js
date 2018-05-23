import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Input from './form/Input'

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 50px'
  },
  tip: {
    width: '100%',
    fontFamily: 'GothamBold'
  },
  tipText: {
    marginLeft: '15%'
  },
  bright: {
    fontSize: '1.6em',
    color: '#81c784',
    textShadow: '#000 0px 0px 2px;'
  },
  formHolder: {
    margin: '5% 0',
    width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonHolder: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: '#9E9E9E',
    borderRadius: '3px',
    width: '120px',
    padding: '7px',
    fontFamily: 'GothamBold',
    color: '#29353a',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  buttonDHCP: {
    marginRight: 'auto'
  },
  buttonSubmit: {
    backgroundColor: '#4CAF50',
    color: '#fff'
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
  // If a saved IP config is needed, the state of this form will reflect that
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

  // Saves form values to state on the fly
  _setIp = (val) => { this.setState({ ipAddress: val }) }
  _setSubnet = (val) => { this.setState({ subnet: val }) }
  _setGateway = (val) => { this.setState({ gateway: val }) }

  // Submits form with object
  _submitForm = (settings) => {
    this.props.setStatic(settings);
  }

  render() {
    const { ipAddress, gateway, subnet } = this.state

    const interfaceSettings = [
      ipAddress,
      gateway,
      subnet,
    ]

    return (
      <div className={css(styles.formContainer)}>
        <div className={css(styles.tip)}>
          <h1 className={css(styles.tipText)}>
            <u>
              You are changing the IP configuration for:
            </u>
              <span className={css(styles.bright)}> {this.props.selectedAdapter}</span>
          </h1>
        </div>
        <div className={css(styles.formHolder)}>
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
        </div>
        <div className={css(styles.buttonHolder)}>
          <button
            className={css(styles.button, styles.buttonDHCP)}
            onClick={this.props.setDHCP}
          >
            SET DHCP
          </button>
          <button
            className={css(styles.button, styles.buttonSubmit)}
            onClick={() => { this._submitForm(interfaceSettings) }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default SwitchForm;
