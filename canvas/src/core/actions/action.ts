

export type ActionPayload = {} | number | string | [] | [{}] 

export type ActionEvent<T, T1 extends ActionPayload> ={
    actionType:T,
    payload: T1
};

