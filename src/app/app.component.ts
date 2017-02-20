import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from "rxjs";

declare let gapi: GoogleApiService;

export interface GoogleApiService {
  auth2: Auth2Service;
  client: ClientService;
  load: (a,b) => Promise<void>;
}

export interface Auth2Service {
  getAuthInstance(): GoogleAuth;
}

export interface GoogleAuth {
  isSignedIn: IsSignedInService;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}

export interface IsSignedInService {
  get(): boolean;
  listen(listener: (isSignedIn: boolean) => void);
}

export interface ClientService {
  init: (args: ClientArguments) => Promise<void>;
  gmail?: GmailService;
}

export interface GmailService {
  users: UsersService;
}

export interface UsersService {
  settings: SettingsService;
}

export interface SettingsService {
  filters: FilterService;
}

export interface FilterService {
  create(): void;
  delete(): void;
  get(): void;
  list(request: UserIdRequest): Promise<FilterResponse>;
}

export interface UserIdRequest {
  userId: "me" | string;
}

export interface FilterResponse {
  body: string;
  headers: ResponseHeader;
  result: FilterResponseBody;
  status: 200 | number;
  statusText?: string;
}

export interface ResponseHeader {
  "cache-control": string;
  "content-encoding": string;
  "content-length": string;
  "content-type": string;
  date: string; // date
  etag: string;
  expires: string; // date
  server: string;
  vary: string;
}

export interface FilterResponseBody {
  filter: Filter[];
}

export interface Filter {
  id: string;
  criteria: FilterCriteria;
  action: FilterAction;
}

export interface FilterCriteria {
  from: string;
  to: string;
  subject: string;
  query: string;
  negatedQuery: string;
  hasAttachment: boolean;
  excludeChats: boolean;
  size: number;
  sizeComparison: string;
}

export interface FilterAction {
  addLabelIds: string[];
  removeLabelIds: string[];
  forward: string;
}

export interface ClientArguments {
  apiKey?: string;
  discoveryDocs?: string[];
  clientId: string;
  scope: string; // Space delimited
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private _clientId = "1088575993473-amlsk3ccndembc4b4ij6lsa2r4t1jrv7.apps.googleusercontent.com";
  private _discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
  // Space seperated
  private _scopes = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.settings.basic";

  public filters: Observable<Filter[]>;

  constructor(
    private zone: NgZone
  ) {

  }

  public ngOnInit(): void {
    this.loadScript();    
  }

  private onScriptLoaded(): void {
    new Promise((resolve) => {      
      resolve(gapi);
    })
    .then(() => {
      gapi.load("client:auth2", this.initClient.bind(this));
    });
  }

  private loadScript(): void {
    let node = document.createElement("script");
    node.src = "https://apis.google.com/js/api.js";
    node.type = "text/javascript";
    node.onload = (ev) => {
      console.log("loads", ev);
      console.log(gapi);
      this.onScriptLoaded();
    };
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  private initClient(): void {
    gapi.client
      .init({
        discoveryDocs: this._discoveryDocs,
        clientId: this._clientId,
        scope: this._scopes
      })
      .then(() => {
        // Listen for sign-in state changes
        // gapi.auth2.init({
        //   "client_id": this._clientId,
        //   scope: "profile email openid"
        // }).then(() => {
          let instance = gapi.auth2.getAuthInstance();
          
          instance.isSignedIn
            .listen(() => { 
              this.loadFilters(); 
            });

              this.loadFilters(); 
        // });
      });
  }

  private loadFilters(): void {
    gapi.client.gmail.users.settings.filters
      .list({
        userId: "me"
      })
      .then(response => {
        this.zone.run(() => {
          this.title = "loaded!";
          this.filters = Observable.of(response.result.filter)
            .publishBehavior([])
            .refCount();
        });
      });
  }

  public authorize(): void {
    gapi.auth2.getAuthInstance().signIn();
  }

  public signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

}
