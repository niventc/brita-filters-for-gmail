import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { UserService } from "../users/user.service";
import { GoogleApiService } from "../google-api.service";

@Injectable()
export class LabelProvider {
    
    private _labels: BehaviorSubject<gapi.Label[]> = new BehaviorSubject(null);
    
    public get labels(): Observable<gapi.Label[]> {
        return this._labels.asObservable();   
    };

    constructor(
        private _userService: UserService,
        private _googleApi: GoogleApiService,
        private _zone: NgZone
    ) {
        this._userService.user.subscribe(user => {
            if(user.isSignedIn) {
                _googleApi.service.subscribe(gapi => {
                    gapi.client.gmail.users.labels.list({
                        userId: "me"
                    }).then(response => {
                        this._zone.run(() => this._labels.next(response.result.labels));
                    });
                });
            }
        });
    }

}