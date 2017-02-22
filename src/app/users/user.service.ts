import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { GoogleApiService } from "../google-api.service";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
}

@Injectable()
export class UserService {

    private _user: BehaviorSubject<User> = new BehaviorSubject(null);
    public user: Observable<User>;

    constructor(
        private _zone: NgZone,
        private _googleApi: GoogleApiService
    ) {
        this.user = this._user.asObservable();

        this._googleApi.service 
            .subscribe(x => {
                if(x === null) {
                    return;
                }

                x.auth2.getAuthInstance()
                    .isSignedIn
                    .listen(() => {
                        //this.loadFilters();
                    });

                let basicProfile = (<any>x.auth2
                    .getAuthInstance())
                    .currentUser
                    .get()
                    .getBasicProfile();

                let user = <User>{
                    email: basicProfile.getEmail(),
                    firstName: basicProfile.getGivenName(),
                    lastName: basicProfile.getFamilyName(),
                    pictureUrl: basicProfile.getImageUrl()
                };

                this._zone.run(() => this._user.next(user));
            });
    }

    public signIn(): void {        
        gapi.auth2.getAuthInstance().signIn();
    }

    public signOut(): void {        
        gapi.auth2.getAuthInstance().signOut();
    }
}