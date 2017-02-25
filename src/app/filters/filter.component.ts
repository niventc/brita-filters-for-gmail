import { Component, Input } from "@angular/core";

@Component({
    selector: "[filter]",
    templateUrl: "./filter.html"
})
export class FilterComponent {

    @Input() public filter: gapi.Filter;

}