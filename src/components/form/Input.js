import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  inputHolder: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    margin: '0 0 10px 0'
  },
  label: {
    margin: '10px 0',
    fontFamily: 'GothamBold',
    fontSize: 20,
    color: '#29353a'
  },
  input: {
    padding: '10px',
    border: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    borderRadius: '5px'
  }
});

export default class Input extends React.Component {
  // Called when input value changes and sends to props
  _inputChange = (e) => {
    this.props.setValue(e.target.value);
  }

  render() {
    return (
      <div className={css(styles.inputHolder)}>
        <label
          htmlFor={this.props.label}
          className={css(styles.label)}
        >
          {this.props.label}
        </label>
        <input
          onChange={this._inputChange}
          className={css(styles.input)}
          id={this.props.label}
          value={this.props.value}
        />
        </div>
      );
    }
  }
