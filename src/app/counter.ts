import { AppState, Massif } from './app.component';

export const LOAD = 'LOAD';

const initialState: AppState = {
    massifs: []
};

export interface Action {
    type: string;
    payload: any;
}

export function counterReducer(state: AppState = initialState, action: Action) {
    switch (action.type) {
        case LOAD:
            state.massifs = action.payload;
            console.log(state);
            return state;
        default:
            return state;
    }
}
