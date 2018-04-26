import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#29353a',
    width: '100%',
    height: '100%',
    color: '#fff'
  },
  title: {
    fontSize: '2em',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  }
});

class Loading extends Component {
  render() {
    return (
      <div className={css(styles.loading)}>
        <h1 className={css(styles.title)}>LOADING</h1>
      </div>
    );
  }
}

export default Loading;
