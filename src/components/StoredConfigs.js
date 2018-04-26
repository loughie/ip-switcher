import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import configs from '../configs.json'

const styles = StyleSheet.create({
  holder: {
    
  },
});

export default class StoredConfigs extends React.Component {

  _loadConfig = (config) => {
    this.props.loadConfig(config)
  }

  render() {
    console.log(configs);
    return (
      <ul>
        {configs.map((config) => {
          return (
            <li
              onDoubleClick={() => { this._loadConfig(config) }}
            >
              {config.name}
            </li>
          )
        })}
      </ul>
    );
  }
}
