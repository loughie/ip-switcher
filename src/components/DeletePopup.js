import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  popup: {
    display: 'none',
    backgroundColor: '#fff',
    width: 400,
    height: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  active: {
    display: 'visible',
  }
});

export default class DeletePopup extends Component {

  render() {
    return (
      <div className={css(styles.popup, this.props.isDeleting && styles.active)}>
        <h1> he </h1>
      </div>
    );
  }
}

