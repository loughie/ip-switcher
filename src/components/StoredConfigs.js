import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import BinIcon from 'react-icons/lib/md/delete';
import configs from '../configs.json'

const styles = StyleSheet.create({
  holder: {
    padding: '5%',
    listStyle: 'none',
    fontFamily: 'GothamBold',
  },
  listItem: {
    margin: '12px 0',
    display: 'flex',
    alignItems: 'centre'
  },
  listItemIcon: {
    marginLeft: 'auto',
    fontSize: '1.2em',
    cursor: 'pointer'
  }
});

export default class StoredConfigs extends React.Component {
  // Loads users requested config when list item is double clicked
  _loadConfig = (config) => {
    this.props.loadConfig(config)
  }

  _deleteConfirm = (config) => {
    this.props.deleteConfirm(config)
  }

  render() {
    return (
      <ul className={css(styles.holder)}>
        <h2>Configurations</h2>
        {configs.map((config) => {
          console.log(config);
          return (
            <li className={css(styles.listItem)}>
              <h2 onDoubleClick={() => { this._loadConfig(config) }}>
                {config.name}
              </h2>
              <BinIcon
                className={css(styles.listItemIcon)}
                onClick={() => { this._deleteConfirm(config) }}
              />
            </li>
          )
        })}
      </ul>
    );
  }
}
