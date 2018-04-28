import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ExitIcon from 'react-icons/lib/md/clear';

const styles = StyleSheet.create({
  holder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    fontFamily: 'GothamBold'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'fixed'
  },
  popup: {
    backgroundColor: '#fff',
    width: 400,
    height: 150,
    borderRadius: '3px',
    zIndex: 1000,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  },
  bar: {
    backgroundColor: '#81c784',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'GothamBold',
    borderRadius: '3px 3px 0 0'
  },
  confirmText: {
    color: '#29353a',
    fontFamily: 'GothamBold',
    fontSize: '1em'
  },
  button: {
    width: '75px',
    padding: '5px 0',
    borderRadius: '3px',
    fontFamily: 'GothamBold',
    color: '#fff'
  },
  buttonCancel: {
    backgroundColor: '#e53935'
  },
  buttonConfirm: {
    backgroundColor: '#43A047'
  },
  exit: {
    marginLeft: 'auto',
    fontSize: '1.6em',
    cursor: 'pointer'
  }
});

export default class DeletePopup extends Component {
  // Closes popup
  _closePopup = () => {
    this.props.closePopup()
  }
  // Deletes selected config
  _confirmDelete = (config) => {
    this.props.deleteConfig(config)
  }
  render() {
    return (
      <div className={css(styles.holder)}>
        <div className={css(styles.popup)}>
          <div className={css(styles.bar)}>
            <h1>Delete {this.props.configToDelete.name}? </h1>
            <ExitIcon
              className={css(styles.exit)}
              onClick={() => { this._closePopup() }}
            />
          </div>
          <div>
            <h2 className={css(styles.confirmText)}>Are you sure?</h2>
            <button
              className={css(styles.button, styles.buttonConfirm)}
              onClick={() => { this._confirmDelete(this.props.configToDelete) }}
            >
              Confirm
            </button>
            <button
              className={css(styles.button, styles.buttonCancel)}
              onClick={() => { this._closePopup() }}
            >
                Cancel
            </button>
          </div>
        </div>
        <div
          className={css(styles.overlay)}
          onClick={() => { this._closePopup() }}
        />
      </div>
    );
  }
}

