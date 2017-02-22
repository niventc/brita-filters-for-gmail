
export = gapi;
export as namespace gapi;

declare namespace gapi {

    interface GoogleApiService {
        auth2: Auth2Service;
        client: ClientService;
        load: (a,b) => Promise<void>;
    }

    export interface Auth2Service {
        getAuthInstance(): GoogleAuth;
    }

    export interface GoogleAuth {
        currentUser: CurrentUserService;
        isSignedIn: IsSignedInService;
        signIn(): Promise<void>;
        signOut(): Promise<void>;
    }

    export interface CurrentUserService {
        get(): void;
        listen(x: any): void;
        set(x: any): void;
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
        from?: string;
        to?: string;
        subject?: string;
        query?: string;
        negatedQuery?: string;
        hasAttachment?: boolean;
        excludeChats?: boolean;
        size?: number;
        sizeComparison?: string;
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

}