import * as _ from "lodash";

import { Component, Input, OnInit } from "@angular/core";

import { LabelProvider } from "./label.provider";

@Component({
    selector: "label",
    templateUrl: "./label.html"
})
export class LabelComponent implements OnInit {

    @Input() public labelId: string;

    public label: gapi.Label;

    constructor(
        private _labelProvider: LabelProvider
    ) {

    }

    public ngOnInit(): void {
        this._labelProvider.labels
            .subscribe(labels => {
                if(labels) {
                    this.label = _(labels).find(x => x.id === this.labelId);
                }
            });
    }

}