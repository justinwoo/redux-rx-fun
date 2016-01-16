type redux$Reducer<T> = (state: T, action: any) => T;

interface redux$Store<T> {
  subscribe(observer: () => any): void;
  dispatch(action: any): void;
  getState(): T;
};

declare module 'redux' {
  declare function createStore<T>(reducer: redux$Reducer<T>): redux$Store;
}
