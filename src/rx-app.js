/* @flow */

import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import type {State} from './common';
import {initState, View} from './common';

type Project = (state: State) => State;

const increment$ = new Rx.Subject();
const decrement$ = new Rx.Subject();

function projectIncrement(): Project {
  return function (state: State): State {
    return Object.assign({}, state, {
      counter: state.counter + 1
    });
  };
}

function projectDecrement(): Project {
  return function (state: State): State {
    return Object.assign({}, state, {
      counter: state.counter - 1
    });
  };
}

export const rxCallbacks = {
  increment: function () {
    increment$.onNext();
  },
  decrement: function () {
    decrement$.onNext();
  }
};

// doesn't throw errors?...
export const rxState$ = Rx.Observable
  .merge(
    increment$.map(projectIncrement),
    decrement$.map(projectDecrement)
  )
  .startWith(initState)
  .scan(function (state: State, project: Project) {
    return project(state);
  });

export function renderRxApp (rxState: State) {
  console.log('rxState', rxState);

  const view = (
    <View
      name='Rx'
      state={rxState}
      callbacks={rxCallbacks}
    />
  );

  ReactDOM.render(view, document.getElementById('app-rx'));
}
