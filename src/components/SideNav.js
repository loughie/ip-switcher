import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import AddIcon from 'react-icons/lib/md/add-circle';
import StoredConfigs from './StoredConfigs';
import Popup from './Popup';
import Input from './form/Input'

const styles = StyleSheet.create({
  sideNav: {
    backgroundColor: '#29353a',
    display: 'flex',
    width: '30%',
    height: '100%',
    color: '#fff',
    padding: '2%'
  },
  switcherHolder: {
    width: '100%',
    height: '20%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px'
  },
  button: {
    borderRadius: '5px',
    backgroundColor: 'transparent',
    fontFamily: 'GothamBold',
    color: '#fff',
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    transition: 'all ease 500ms'
  },
  active: {
    backgroundColor: '#81c784',
    boxShadow: 'inset 0px 0px 9px 3px rgba(0, 0, 0, 0.45)',
  }
});

class SideNav extends Component {
  // Gets app startup state of which adapter is currently in use.
  constructor(props) {
    super(props);
    this.state = {
      currentAdapter: props.currentAdapter.name,
      isDeleting: false,
      configToDelete: null,
      isAddingNewConfig: false,
    }
  }
  // Changes adapter user wants to change IP for. Changes local state for button style toggle.
  _selectAdapter = (adapter) => {
    this.setState({ currentAdapter: adapter })
    this.props.changeAdapter(adapter)
  }

  _toggleAddNewConfig = () => {
    this.setState({ isAddingNewConfig: !this.state.isAddingNewConfig })
  }

  // Filters out bluetooth adapters and maps buttons for ethernet and Wi-Fi.
  // TODO: Research other types of adapter that may need filtering due to non ip requirements.
  _mapAdapterSelects = () => {
    return (
      this.props.adapterList.filter(adapter => !adapter.name.toLowerCase().includes('bluetooth')).map((name) => {
        return (
          <button
            key={name.name}
            className={css(styles.button, this.state.currentAdapter === name.name && styles.active)}
            onClick={() => { this._selectAdapter(name.name) }}
          >
            {name.name}
          </button>
        )
      })
    )
  }

  // 
  _toggleDeletePop = (configToDelete) => {
    this.setState({
      isDeleting: !this.state.isDeleting,
      configToDelete: configToDelete
    })
  }

  _deleteConfig = () => {
    this.props.deleteConfig(this.state.configToDelete)
  }

  render() {
    return (
      <div className={css(styles.sideNav)}>
        <div className={css(styles.switcherHolder)}>
          {this._mapAdapterSelects()}
        </div>
        <div className={css(styles.configsHolder)}>
          <StoredConfigs
            loadConfig={this.props.loadConfig}
            deleteConfirm={this._toggleDeletePop}
          />
        </div>
        <div className={css(styles.addNewConfig)}>
          <AddIcon
            onClick={() => { this._toggleAddNewConfig() }}
          />
        </div>
        {this.state.isDeleting &&
          <Popup
            popupTitle={`Delete ${this.state.configToDelete.name}?`}
            buttonText="Confirm"
            popupConfirm={this._deleteConfig}
            closePopup={this._toggleDeletePop}
          />
        }
        {this.state.isAddingNewConfig &&
          <Popup
            popupTitle="Save New Config"
            buttonText="Save Config"
            popupConfirm={this._saveConfig}
            closePopup={this._toggleAddNewConfig}
          >
            <Input
              label="Config Name"
              setValue={this._setName}
              value={this.state.configName}
            />
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
          </Popup>
        }
      </div>
    );
  }
}

export default SideNav;
