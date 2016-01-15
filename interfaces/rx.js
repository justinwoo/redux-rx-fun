declare module 'rx' {
  declare class Observable<T> {
    static merge(sources: Observable<T>[]): Observable<T>;
    static merge(...sources: Observable<T>[]): Observable<T>;

    map<R>(f: (item: T) => R): Observable<R>;

    // scan<R>(f: (item: T) => R): Observable<R>;
    scan<R>(f: (item: T) => R): number; // bogus typedef to trigger errors
    startWith<R>(init: R): Observable<R>;
  }

  declare class Subject<T> extends Observable<T> {
    onNext(item: T): void;
  }
}
