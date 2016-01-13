jest.autoMockOff();

var {rxState$, rxCallbacks} = require('../rx-app');

describe('rx app', () => {
  it('performs actions and modifies state as expected', () => {
    rxCallbacks.decrement();
    rxCallbacks.increment();

    var subTicks = 0;
    rxState$.subscribe(
      state => {
        switch(subTicks++) {
          case 0:
            expect(state.counter).toBe(0);
            break;
          case 1:
            expect(state.counter).toBe(-1);
            break;
          case 2:
            expect(state.counter).toBe(0);
            break;
          default:
            throw 'error';
        }
      },
      _ => {
        throw 'error should not occur';
      },
      _ => {
        expect(subTicks).toBe(2);
      }
    );
  });
});
