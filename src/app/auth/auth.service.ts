import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth) { }

    registerUser(authData: AuthData) {
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authSuccesfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authSuccesfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    logout() {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccesfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}