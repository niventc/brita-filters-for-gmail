import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

import { GoogleApiService } from "../google-api.service";

@Injectable()
export class FilterProvider {

    public filters: Observable<gapi.Filter[]>;

    constructor(
        private _zone: NgZone,
        private _googleApi: GoogleApiService
    ) {
        this.filters = Observable.of(sample);
    }

    private loadFilters(): void {
        gapi.client.gmail.users.settings.filters
            .list({
                userId: "me"
            })
            .then(response => {
                this._zone.run(() => {
                    this.filters = Observable.of(response.result.filter)
                        .publishBehavior([])
                        .refCount();
                });
            });
    }
}

const sample: gapi.Filter[] = require("./sample.json");