/* @flow */

import {createStore} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import type {State} from './common';
import {initState, View} from './common';

type Action = {
  type: string,
  payload?: Object
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function projectRedux(state: State = initState, action : Action): State {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    case DECREMENT:
      return Object.assign({}, state, {
        counter: state.counter - 1
      });
    default:

      return state;
  }
}

export const reduxStore = createStore(projectRedux);

export const reduxCallbacks = {
  increment: function () {
    reduxStore.dispatch({
      type: INCREMENT
    });
  },
  decrement: function () {
    reduxStore.dispatch({
      type: DECREMENT
    });
  }
}

export function renderReduxApp() {
  const reduxState = reduxStore.getState();

  console.log('reduxState', reduxState);

  const view = (
    <View
      name='Redux'
      state={reduxState}
      callbacks={reduxCallbacks}
    />
  );

  ReactDOM.render(view, document.getElementById('app-redux'));
}
