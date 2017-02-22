import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UserService, User } from "./user.service";

@Component({
    selector: "user",
    templateUrl: "./user.html"
})
export class UserComponent implements OnInit {

    public user: Observable<User>;

    constructor(
        private _userService: UserService
    ) {

    }

    public ngOnInit(): void {
        this.user = this._userService.user;
    }

    public signIn(): void {
        this._userService.signIn();
    }

    public signOut(): void {
        this._userService.signOut();
    }

}