import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UserService, User } from "./user.service";

@Component({
    selector: "user",
    templateUrl: "./user.html"
})
export class UserComponent implements OnInit {

    public isLoading: boolean;
    public user: Observable<User>;

    constructor(
        private _userService: UserService
    ) {
        this.isLoading = true;
    }

    public ngOnInit(): void {
        this.user = this._userService.user;

        this.user.subscribe(user => {
            if(user) {
                this.isLoading = false;
            }
        });
    }

    public signIn(): void {
        this._userService.signIn();
    }

    public signOut(): void {
        this._userService.signOut();
    }

}