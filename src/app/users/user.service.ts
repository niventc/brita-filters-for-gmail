import * as _ from "lodash";

import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { GoogleApiService } from "../google-api.service";

export interface User {
    isSignedIn: boolean;
    email?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
}

@Injectable()
export class UserService {

    private _user: BehaviorSubject<User> = new BehaviorSubject(null);

    public get user(): Observable<User> {
        return this._user.asObservable();
    };

    constructor(
        private _zone: NgZone,
        private _googleApi: GoogleApiService
    ) {
        this._googleApi.service 
            .subscribe(x => {
                if(x === null) {
                    return;
                }

                let authInstance = x.auth2.getAuthInstance();

                let basicProfile = authInstance.currentUser
                    .get()
                    .getBasicProfile();

                if(_(basicProfile).isUndefined()) {                    
                    this._zone.run(() => 
                        this._user.next({
                            isSignedIn: false
                        }
                    ));
                } else {
                    this.userIsSignedIn(basicProfile);
                }

                authInstance
                    .isSignedIn
                    .listen((isSignedIn) => {
                        if(isSignedIn) {
                            let basicProfile = x.auth2
                                .getAuthInstance()
                                .currentUser
                                .get()
                                .getBasicProfile();
                            
                            this.userIsSignedIn(basicProfile);
                        } else {
                            this._zone.run(() => this._user.next(null));
                        }
                    });
            });
    }

    private userIsSignedIn(basicProfile: gapi.BasicProfile): void {
        let user = <User>{
            isSignedIn: true,
            email: basicProfile.getEmail(),
            firstName: basicProfile.getGivenName(),
            lastName: basicProfile.getFamilyName(),
            imageUrl: basicProfile.getImageUrl()
        };

        this._zone.run(() => this._user.next(user));
    }

    public signIn(): void {        
        gapi.auth2.getAuthInstance().signIn();
    }

    public signOut(): void {        
        gapi.auth2.getAuthInstance().signOut();
    }
}