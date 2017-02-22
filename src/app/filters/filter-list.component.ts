import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { FilterProvider } from "./filter.provider";

@Component({
    selector: "filter-list",
    templateUrl: "./filter-list.html"
})
export class FilterListComponent implements OnInit {

    public filters: Observable<gapi.Filter[]>;

    constructor(
        private _filterProvider: FilterProvider
    ) {

    }

    public ngOnInit(): void {
        this.filters = this._filterProvider.filters;
    }
}