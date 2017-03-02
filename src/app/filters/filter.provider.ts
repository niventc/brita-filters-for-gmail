import * as _ from "lodash";

import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { GoogleApiService } from "../google-api.service";
import { UserService } from "../users/user.service";

export interface Filter extends gapi.Filter {
    action: Action;
}

export interface Action extends gapi.FilterAction {
    skipInbox: boolean;
    markAsRead: boolean;
}

@Injectable()
export class FilterProvider {

    private _filters: BehaviorSubject<gapi.Filter[]> = new BehaviorSubject<gapi.Filter[]>([]);

    public get filters(): Observable<gapi.Filter[]> {
        return this._filters.asObservable();
    }

    constructor(
        private _zone: NgZone,
        private _googleApi: GoogleApiService,
        private _userService: UserService
    ) {
        this._userService.user.subscribe((user) => {
            if(user) {
                let mapped = sample.map(x => {
                    let map = <Filter>x;
                    
                    if(map.action && map.action.removeLabelIds) {
                        if(map.action.removeLabelIds.indexOf("INBOX") >= 0) {
                            map.action.skipInbox = true;
                            map.action.removeLabelIds = _(map.action.removeLabelIds).without("INBOX").value();
                        }
                        if(map.action.removeLabelIds.indexOf("UNREAD") >= 0) {
                            map.action.markAsRead = true;
                            map.action.removeLabelIds = _(map.action.removeLabelIds).without("UNREAD").value();
                        }

                        if(map.action.removeLabelIds.length === 0) {
                            map.action.removeLabelIds = null;
                        }
                    }

                    return map;
                });

                this._filters.next(mapped);
            }
        });
    }

    private loadFilters(): void {
        gapi.client.gmail.users.settings.filters
            .list({
                userId: "me"
            })
            .then(response => {
                this._zone.run(() => {
                    this._filters.next(response.result.filter);
                });
            });
    }
}

const sample: gapi.Filter[] = require("./sample.json");