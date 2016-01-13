/* @flow */

/* Redux app */

import {reduxStore, renderReduxApp} from './redux-app';

reduxStore.subscribe(function () {
  renderReduxApp();
});

renderReduxApp();

/* Rx app */

import {rxState$, renderRxApp} from './rx-app';

rxState$.subscribe(renderRxApp);
