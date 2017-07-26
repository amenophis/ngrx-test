import { App, Area, Action } from './app.component';

export const AREAS_LOAD = 'AREAS_LOAD';
export const MASSIFS_LOAD = 'MASSIFS_LOAD';

const initialState = [];

export function appReducer(state: App = new App(), action: Action) {
    switch (action.type) {
        case MASSIFS_LOAD:
            return Object.assign({}, state, {massifs: action.payload});
        case AREAS_LOAD:
            return Object.assign({}, state, {areas: action.payload});
        default:
            return state;
    }
}
