/* @flow */

/* Common */

import React from 'react';

export type State = {
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

export const initState = {
  counter: 0
};

export class View extends React.Component {
  props: ViewProps;
  static defaultProps: ViewProps;

  render(): ReactElement {
    return (
      <div>
        <h2>Hello, {this.props.name}!</h2>
        <h2>Count: {this.props.state.counter}</h2>
        <button onClick={this.props.callbacks.increment}>+</button>
        <button onClick={this.props.callbacks.decrement}>-</button>
      </div>
    );
  }
}

// this errors correctly that type number is incompatible with string:
// <View name={232}/>

// this has missing properties but doesn't throw any errors:
// <View name="sdsdfdf"/>
