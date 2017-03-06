import { Component, Input } from "@angular/core";

@Component({
    selector: "email-list",
    templateUrl: "./email-list.html"
})
export class EmailListComponent { 

    @Input() public emails: Array<string>;


}