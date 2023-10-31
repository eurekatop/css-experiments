import { Observable, ReplaySubject , firstValueFrom } from "rxjs";

export class CoreStore<T> {
  constructor() {
  }

  private dataSubjects: { [index: string]: ReplaySubject<T> } = {};

  private _createSubject(key:string) {
    if (this.dataSubjects[key] === undefined) {
        this.dataSubjects[key] = new ReplaySubject<T>(0);
      }
  }

  set(key: string, value: T): void {
    this._createSubject(key);

    this.dataSubjects[key].next(value)
  }

  async get(key: string): Promise<T | undefined> {
    if ( this.dataSubjects[key] === undefined ) {
      throw new Error(`${key} undefined`)
    }

    const subject = this.dataSubjects[key];
    
      const value = await firstValueFrom(subject);
      return value;
  }
  
  getObservable(key:string): Observable<T> {
    if ( this.dataSubjects[key] === undefined ) {
      throw new Error(`${key} undefined`)
    }
    this._createSubject(key);
    
    return this.dataSubjects[key]
  }
}
