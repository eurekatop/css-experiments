import { Subject, Observable } from "rxjs";

class AppStore<T> {
  private data: Record<string, any> = {};

  constructor() {
    //alert(1)
  }

  private dataSubjects: { [index: string]: Subject<T> } = {};

  //age$: Observable<number> = this.ageSubject.asObservable();

  //setName(newName: string) {
  //  this.nameSubject.next(newName);
  //}
  //
  //setAge(newAge: number) {
  //  this.ageSubject.next(newAge);
  //}

  // Set a value in the store
  set(key: string, value: T): void {
    if (this.dataSubjects[key] === undefined) {
      const _s = new Subject<T>();
      this.dataSubjects[key] = _s;
    }
    this.dataSubjects[key].next(value);
  }

  async get(key: string): Promise<T> {
    if (this.dataSubjects[key] === undefined) {
      const _s = new Subject<T>();
      this.dataSubjects[key] = _s;
    }

    return new Promise((resolve, error) => {
      this.dataSubjects[key].subscribe((value) => resolve(value));
    });
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
const stringStore = new AppStore<string>();
export { stringStore };
