import { Observable, ReplaySubject, distinctUntilChanged, firstValueFrom, map } from 'rxjs';

/**
 * Represents a core data store for managing and observing data.
 *
 * @export
 * @class CoreStore
 * @typedef {CoreStore}
 * @template  T - The type of data stored in the store.
 */
export class CoreStore<T> {
  protected dataSubjects: { [index: string]: ReplaySubject<T> } = {};
  protected dataPropSubjects: { [index: string]: { [P in keyof T]: ReplaySubject<T[P]> } } = {};

  private _createSubject(key: string) {
    if (this.dataSubjects[key] === undefined) {
      this.dataSubjects[key] = new ReplaySubject<T>(0);
    }
  }

  private _createPropSubject<K extends keyof T>(key: string, prop: K) {
    if (this.dataPropSubjects[key] === undefined) {
      this.dataPropSubjects[key] = {} as { [P in keyof T]: ReplaySubject<T[P]> };
    }

    if (this.dataPropSubjects[key][prop] === undefined) {
      this.dataPropSubjects[key][prop] = new ReplaySubject<T[K]>(0);
    }
  }

  /**
   * Sets the value of a data item identified by the given key.
   *
   * This function allows you to set the value of a specific data item in your data store
   * identified by the 'key' parameter. The 'value' parameter represents the new value to be
   * associated with the data item.
   *
   * @param {string} key - The unique key identifying the data item to update.
   * @param {T} value - The new value to set for the data item.
   */
  set(key: string, value: T): void {
    this._createSubject(key);

    this.dataSubjects[key].next(value);
  }

  /**
   * Asynchronously updates a specific property of the state identified by the given key.
   *
   * This function allows you to update a specific property ('prop') of the state associated with the
   * provided 'key'. It asynchronously retrieves the current state, creates a new state with the
   * specified property updated, and emits the updated state.
   *
   * @async
   * @template {keyof T} K - The type of the property to be updated.
   * @param {string} key - The unique key identifying the state to update.
   * @param {K} prop - The property within the state to update.
   * @param {T[K]} value - The new value to set for the specified property.
   * @returns {Promise<void>} - A promise that resolves after the state is updated.
   * @throws {Error} If the 'key' does not exist in the data store.
   */
  async setProp<K extends keyof T>(key: string, prop: K, value: T[K]): Promise<void> {
    if (this.dataSubjects[key] === undefined) {
      throw new Error(`Data item with key '${key}' is undefined`);
    }
    this._createPropSubject(key, prop);

    const state: T = await firstValueFrom(this.dataSubjects[key]);

    let propState: T[K] = { ...state[prop] };

    propState = value;

    this.dataPropSubjects[key][prop].next(propState);
  }

  /**
   * Asynchronously retrieves the most recent value of a data item identified by the given key.
   *
   * This function asynchronously retrieves the most recent value of a specific data item
   * identified by the 'key' parameter from your data store. It returns a promise that resolves
   * with the value or undefined if the data item doesn't exist.
   *
   * @async
   * @param {string} key - The unique key identifying the data item to retrieve.
   * @returns {Promise<T | undefined>} - A promise that resolves with the value or undefined.
   * @throws {Error} If the 'key' does not exist in the data store.
   */
  async get(key: string): Promise<T | undefined> {
    if (this.dataSubjects[key] === undefined) {
      throw new Error(`Data item with key '${key}' is undefined`);
    }

    const subject = this.dataSubjects[key];

    const value = await firstValueFrom(subject);
    return value;
  }

  /**
   * Returns an observable for a specific data item identified by the given key.
   *
   * This function returns an observable that allows you to subscribe to updates of a specific
   * data item in your data store. The 'key' parameter is used to identify the data item to observe.
   *
   * @param {string} key - The unique key identifying the data item to observe.
   * @returns {Observable<T>} - An observable that emits updates for the specified data item.
   * @throws {Error} If the 'key' does not exist in the data store.
   */
  getObservable(key: string): Observable<T> {
    if (this.dataSubjects[key] === undefined) {
      throw new Error(`Data item with key '${key}' is undefined`);
    }
    this._createSubject(key);

    return this.dataSubjects[key];
  }

  /**
   * Creates an observable that listens to changes in a specific property of the state.
   *
   * This function allows you to subscribe to updates of a specific property ('prop') in the state
   * identified by the given 'key'. The observable emits values of the type of the specified property.
   *
   * @template {keyof T} K - The type of the property you want to observe.
   * @param {string} key - The key or identifier of the state to observe.
   * @param {K} prop - The property within the state to observe.
   * @returns {Observable<T[K]>} - An observable that emits values of the specified property.
   * @throws {Error} If the 'key' does not exist in the data store.
   */
  observeProp<K extends keyof T>(key: string, prop: K): Observable<T[K]> {
    if (this.dataPropSubjects[key][prop] === undefined) {
      throw new Error(`Data item with key '${key}' is undefined when accessing ${String(prop)}`);
    }

    return this.dataPropSubjects[key][prop];
    //return this.dataSubjects[key]   .pipe(map((state) => state[prop]));
  }
}
