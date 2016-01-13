jest.autoMockOff();

var {reduxStore, reduxCallbacks} = require('../redux-app');

describe('redux app', () => {
  it('performs actions and modifies state as expected', () => {
    var subTicks = 0;
    var counter = reduxStore.getState().counter;

    reduxStore.subscribe(() => subTicks++);

    reduxCallbacks.decrement();
    expect(reduxStore.getState().counter).toBe(--counter);

    reduxCallbacks.increment();
    expect(reduxStore.getState().counter).toBe(++counter);

    expect(subTicks).toBe(2);
  });
});
