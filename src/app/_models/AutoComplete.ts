import { FormGroup } from '@angular/forms';

export class AutoComplete {
    public controlName: string;
    public parentFormGroup: FormGroup;
    public inputFieldsFormat: Array<string>;
    public searchList: any;
    public hasError: boolean;
    public loadIcon: boolean;
    public placeHolder: string;
    public objectId: string;
    public displayFields: Array<string>;
    public dependentFields: Array<string>;

    constructor(
        controlName: string,
        parentFormGroup: FormGroup,
        inputFieldsFormat: Array<string>,
        searchList: any,
        hasError: boolean,
        loadIcon: boolean,
        placeHolder: string,
        objectId: string,
        displayFields: Array<string>,
        dependentFields: Array<string>
    ) {
        this.controlName = controlName;
        this.parentFormGroup = parentFormGroup;
        this.inputFieldsFormat = inputFieldsFormat;
        this.searchList = searchList;
        this.hasError = hasError;
        this.loadIcon = loadIcon;
        this.placeHolder = placeHolder;
        this.objectId = objectId;
        this.displayFields = displayFields;
        this.dependentFields = dependentFields;
    }

}
