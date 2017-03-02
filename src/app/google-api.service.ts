import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { environment } from "../environments/environment";

@Injectable()
export class GoogleApiService {

    private _service: BehaviorSubject<gapi.GoogleApiService> = new BehaviorSubject(null);
    
    public get service(): Observable<gapi.GoogleApiService> {
        return this._service.asObservable();   
    };

    constructor(
        private _zone: NgZone
    ) {
        this.loadScript();
    }

    private loadScript(): void {
        let node = document.createElement("script");
        node.src = "https://apis.google.com/js/api.js";
        node.type = "text/javascript";
        node.onload = (ev) => {
            this.onScriptLoaded();
        };
        document.getElementsByTagName("head")[0].appendChild(node);
    }

    private onScriptLoaded(): void {
        new Promise((resolve) => {
            resolve(gapi);
        })
        .then(() => {
            gapi.load("client:auth2", this.initClient.bind(this));
        });
    }

    private initClient(): void {
        gapi.client
            .init({
                discoveryDocs: environment.googleApi.discoveryDocs,
                clientId: environment.googleApi.clientId,
                scope: environment.googleApi.scopes.join(" ")
            })
            .then(() => {
                this._zone.run(() => this._service.next(gapi));
            });
    }

}