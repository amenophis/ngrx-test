import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { LOAD } from './counter';

export interface AppState {
    massifs: Array<Massif>;
}

export interface Massif {
    id: string;
    name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    massifs$: Observable<any>;

    constructor(private store: Store<AppState>, private http: Http) {
        this.http.get('https://api.hohey.fr/massifs.json')
            .map(res => res.json())
            .map(payload => ({ type: LOAD, payload }))
            .subscribe((action) => {
                console.log(action);
                this.store.dispatch(action);
            });
    }

    ngOnInit() {
        this.massifs$ = this.store.select(state => state.massifs);
    }
}
