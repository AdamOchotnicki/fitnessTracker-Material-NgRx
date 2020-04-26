import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
    //authChange = new Subject<boolean>();
    //private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                // this.isAuthenticated = true;
                // this.authChange.next(true);
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                // this.isAuthenticated = false;
                // this.authChange.next(false);
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChange.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(_result => {
                //this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                //this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    login(authData: AuthData) {
        //this.uiService.loadingStateChange.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(_result => {
                //this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                //this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    // isAuth() {
    //     return this.isAuthenticated;
    // }
}