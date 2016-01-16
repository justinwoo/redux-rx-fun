declare module 'rx' {
  declare class Observable<T> {
    static merge<R>(...sources: Observable<R>[]): Observable<R>;

    map<R>(f: (item: T) => R): Observable<R>;

    scan<R>(f: (prev: R, next: T) => R): Observable<R>;
    startWith<R>(init: R): Observable<T>;

    subscribe(
      next: (item: T) => any,
      error?: (error: any) => any,
      complete?: (item: T) => any
    ): {
      unsubscribe: () => void;
    };
  }

  declare class Subject<T> extends Observable<T> {
    onNext(item: T): void;
  }
}
