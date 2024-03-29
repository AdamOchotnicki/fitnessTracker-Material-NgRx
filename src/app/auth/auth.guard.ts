import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    //ActivatedRouteSnapshot, 
    //RouterStateSnapshot, 
    //Router, 
    CanLoad, 
    //Route
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private store: Store<fromRoot.State>) { }

    //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    canActivate() {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    //canLoad(route: Route) {
    canLoad() {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}