import { Subject, Observable, scan } from 'rxjs';
import { ActionEvent, ActionPayload } from './action';


type State = {} | number | string | [] | [{}]


export class ActionListener<T extends State, T1 extends ActionEvent< string, ActionPayload>> {
  private actionSubject: Subject<T1> = new Subject<T1>();
  private actionProcessor: (state: any, action: T1) => any;

  constructor(actionProcessor: (state: T, action: T1) => T) {
    this.actionProcessor = actionProcessor
  }

  public dispatch(action: T1) {
    console.debug ( `Dispatch action in action-listener: ${action.actionType} with: ${JSON.stringify(action.payload)}`)
    console.trace("Dispatch action stack trace:");
    
    this.actionSubject.next(action);
  }

  public subscribeToState(initialState: T): Observable<T> {
    return this.actionSubject.asObservable().pipe(
      scan(this.actionProcessor, initialState)
    );
  }
}
