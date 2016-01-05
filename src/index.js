/* @flow */

/* Common */

import React from 'react';
import ReactDOM from 'react-dom';

type State = {
  counter: number
};

type Callback = () => void;

type ViewProps = {
  name: string,
  callbacks: {
    increment: Callback,
    decrement: Callback
  },
  state: State
};

const initState = {
  counter: 0
};

function View(props: ViewProps) {
  return (
    <div>
      <h2>Hello, {props.name}!</h2>
      <h2>Count: {props.state.counter}</h2>
      <button onClick={props.callbacks.increment}>+</button>
      <button onClick={props.callbacks.decrement}>-</button>
    </div>
  );
}

/* Redux app */

import {createStore} from 'redux';

type Action = {
  type: string,
  payload?: Object
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function projectRedux(state: State = initState, action: Action): State {
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

const reduxStore = createStore(projectRedux);

const reduxCallbacks = {
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

function renderReduxApp() {
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

reduxStore.subscribe(function () {
  renderReduxApp();
});

renderReduxApp();

/* Rx app */

import Rx from 'rx';

const increment$ = new Rx.Subject();
const decrement$ = new Rx.Subject();

function projectIncrement() {
  return function (state: State): State {
    return Object.assign({}, state, {
      counter: state.counter + 1
    });
  };
}

function projectDecrement() {
  return function (state: State): State {
    return Object.assign({}, state, {
      counter: state.counter - 1
    });
  };
}

const rxCallbacks = {
  increment: function () {
    increment$.onNext();
  },
  decrement: function () {
    decrement$.onNext();
  }
};

const rxState$ = Rx.Observable
  .merge(
    increment$.map(projectIncrement),
    decrement$.map(projectDecrement)
  )
  .startWith(initState)
  .scan(function (state, project) {
    return project(state);
  });

rxState$.subscribe(function (rxState: State) {
  console.log('rxState', rxState);

  const view = (
    <View
      name='Rx'
      state={rxState}
      callbacks={rxCallbacks}
    />
  );

  ReactDOM.render(view, document.getElementById('app-rx'));
});
