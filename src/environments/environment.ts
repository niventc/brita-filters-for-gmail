// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export interface Environment {
  production: boolean;

  googleApi: GoogleApiConfiguration;
}

export interface GoogleApiConfiguration {
  clientId: string;
  discoveryDocs: string[];
  scopes: string[];
}

export const environment: Environment = {
  production: false,
  
  googleApi: {
    clientId: "",
    discoveryDocs: [],
    scopes: []
  }
};
