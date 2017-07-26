import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { MASSIFS_LOAD, AREAS_LOAD } from './appReducer';

export class AppState {
    app = new App();
}

export class App {
    massifs: Array<Massif> = [];
    areas: Array<Area> = [];
}

export class Massif {
    id: string;
    name: string;
}

export class Area {
    id: string;
    name: string;
}

export interface Action {
    type: string;
    payload: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    massifs$: Observable<Array<Massif>>;
    areas$: Observable<Array<Area>>;

    constructor(private store: Store<AppState>, private http: Http) {
        this.massifs$ = this.store.select((state: AppState) => state.app.massifs);
        this.areas$ = this.store.select((state: AppState) => state.app.areas);
    }

    ngOnInit() {
        this.http.get('https://api.hohey.fr/massifs.json')
            .map(res => res.json())
            .map(payload => ({ type: MASSIFS_LOAD, payload }))
            .subscribe((action) => {
                console.log(action);
                this.store.dispatch(action);
            });

        this.http.get('https://api.hohey.fr/areas.json')
            .map(res => res.json())
            .map(payload => ({ type: AREAS_LOAD, payload }))
            .subscribe((action) => {
                console.log(action);
                this.store.dispatch(action);
            });
    }
}
