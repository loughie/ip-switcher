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
    backgroundColor: '#e0e1e0',
    width: 400,
    borderRadius: '3px',
    zIndex: 1000,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  },
  inner: {
    padding: '15px',
  },
  bar: {
    backgroundColor: '#81c784',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'GothamBold',
    borderRadius: '3px 3px 0 0'
  },
  buttonHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '12px 0'
  },
  button: {
    width: '100px',
    padding: '5px 0',
    borderRadius: '3px',
    fontFamily: 'GothamBold',
    color: '#fff',
    marginLeft: 'auto',
  },
  buttonCancel: {
    backgroundColor: '#e53935',
    margin: '0 10px 0 0'
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
  _popupConfirm = () => {
    this.props.popupConfirm()
  }
  render() {
    return (
      <div className={css(styles.holder)}>
        <div className={css(styles.popup)}>
          <div className={css(styles.bar)}>
            <h1>{this.props.popupTitle}</h1>
            <ExitIcon
              className={css(styles.exit)}
              onClick={() => { this._closePopup() }}
            />
          </div>
          <div className={css(styles.inner)}>
            {this.props.children}
            <div className={css(styles.buttonHolder)} >
              <button
                className={css(styles.button, styles.buttonCancel)}
                onClick={() => { this._closePopup() }}
              >
                  Cancel
              </button>
              <button
                className={css(styles.button, styles.buttonConfirm)}
                onClick={() => { this._popupConfirm() }}
              >
                {this.props.buttonText}
              </button>
            </div>
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

