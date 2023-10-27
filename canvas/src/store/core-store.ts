import { Subject, Observable, ReplaySubject , take, lastValueFrom, firstValueFrom, BehaviorSubject} from "rxjs";

export class CoreStore<T> {
  constructor() {
  }

  private dataSubjects: { [index: string]: BehaviorSubject<T> } = {};

  private _createSubject(key:string) {
    if (this.dataSubjects[key] === undefined) {
        const _s = new BehaviorSubject<T>(undefined as T);
        this.dataSubjects[key] = _s;
      }
  }

  set(key: string, value: T): void {
    this._createSubject(key);

    this.dataSubjects[key].next(value)
  }

  get(key: string): T {
    this._createSubject(key);

    return this.dataSubjects[key].getValue()
  }

  getObservable(key:string): Observable<T> {
    this._createSubject(key);

    return this.dataSubjects[key].asObservable()
  }

  // Get a value from the store by key
  //get(key: string): any {
  //  return this.data[key];
  //}
  //
  //// Check if a key exists in the store
  //has(key: string): boolean {
  //  return key in this.data;
  //}
  //
  //// Remove a value from the store by key
  //remove(key: string): void {
  //  if (this.has(key)) {
  //    delete this.data[key];
  //  }
  //}
  //
  //// Get all keys in the store
  //getKeys(): string[] {
  //  return Object.keys(this.data);
  //}
  //
  //// Get all values in the store
  //getValues(): any[] {
  //  return Object.values(this.data);
  //}
}

// Example usage of the store
//const stringStore = new CoreStore<string>();
//export { stringStore };
