import { Component, Input } from "@angular/core";

@Component({
    selector: "[filter]",
    templateUrl: "./filter.html"
})
export class FilterComponent {

    @Input() public filter: gapi.Filter;

    public get filterCriteriaFrom(): Array<string> {
        return this.getEmailList(this.filter.criteria.from);
    }

    public get filterCriteriaTo(): Array<string> {
        return this.getEmailList(this.filter.criteria.to);
    }
    
    public get filterActionForward(): Array<string> {
        return this.getEmailList(this.filter.action.forward);
    }

    public getEmailList(emailList: string): Array<string> {
        return emailList.split(/OR/);
    }
}