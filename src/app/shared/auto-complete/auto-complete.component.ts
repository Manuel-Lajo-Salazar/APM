import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AutoComplete } from '../../_models/AutoComplete';

@Component({
  selector: 'pm-auto-complete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})

export class AutoCompleteComponent implements OnInit {
  query = '';
  elementRef;
  isSearching: boolean;
  clickInside: boolean;
  control: AbstractControl;
  selectedIndex: number;
  hasSelected: boolean;
  controlPressed: boolean;

  @Input() config: AutoComplete;

  @Output() selected = new EventEmitter();
  @Output() filteredInput = new EventEmitter<string>();

  constructor(myElemenetRef: ElementRef) {
    this.elementRef = myElemenetRef;
  }

  ngOnInit() {
    this.clickInside = false;
    this.hasSelected = false;
    this.selectedIndex = -1;
    if (this.config) {
      this.control = this.config.parentFormGroup.get(this.config.controlName);
      this.control.valueChanges
        .pipe(debounceTime(500)).subscribe(value => {
          this.query = value;
          if (this.isSearching) {
            this.getData(value);
          }
        });
      this.config.searchList = -1;
    }
  }

  private getData(value) {
    this.filteredInput.emit(value);
  }

  public select(item) {
    const values = [];
    this.config.inputFieldsFormat.forEach(key => {
      const itemKey = item[key];
      if (itemKey !== undefined) {
        values.push(itemKey);
      }
    });
    this.query = values.join(', ');
    this.selected.emit(item);
    this.control.setValue(this.query);
    this.hasSelected = true;
    this.hideResults();
  }

  public handleClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideResults();
      this.clickInside = false;
    } else {
      this.clickInside = true;
    }
  }

  keyDown(event) {
    if (event.keyCode !== 17) {
      this.controlPressed = false;
    }
  }

  keyUp(event) {
    if (event.ctrlKey || event.keyCode === 17) {
      this.controlPressed = true;
      return;
    }
    if (event.keyCode === 40 && (this.selectedIndex < this.config.searchList.length - 1)) {
      this.selectedIndex++;
    } else if (event.keyCode === 38 && this.selectedIndex > 0) {
      this.selectedIndex--;
    } else if (event.keyCode === 13) {
      this.select(this.config.searchList[this.selectedIndex]);
      return;
    } else {
      if (!this.controlPressed && (event.key.length === 1 || event.keyCode === 8 || event.keyCode === 46)) {
        this.selected.emit(undefined);
        this.hasSelected = false;
        this.config.dependentFields.forEach(element => {
          const control = this.config.parentFormGroup.get(element);
          control.setValue('');
        });
      }
    }
  }

  onFocus(target) {
    this.isSearching = true;
    this.control.setValue(this.query);
  }

  lostFocus(event) {
    if (this.isValidEvent(event)) {
      this.hideResults();
    }
    if (this.query.length <= 0) {
      this.selected.emit(undefined);
      this.config.dependentFields.forEach(element => {
        const control = this.config.parentFormGroup.get(element);
        control.setValue('');
      });
    }
    if (!this.hasSelected) {
      this.control.setValue('');
    }
  }

  private isValidEvent(event) {
    return event && event.relatedTarget && event.relatedTarget.localName !== 'li' && event.relatedTarget.localName !== 'div';
  }

  private hideResults() {
    this.config.searchList = -1;
    this.isSearching = false;
  }

  public displayContent(item, position) {
    let result = '';
    const fieldsArray = this.config.displayFields[position].split(',');
    fieldsArray.forEach(element => {
      let value = item[element];
      value = value === undefined || value == null ? '' : value;
      result += ` ${value}${(element === 'city') ? ',' : ''}`;
    });
    return result;
  }

  formValidation(): boolean {
    const control = this.config.parentFormGroup.get(this.config.controlName);
    if (control.dirty && control.errors) {
      return true;
    }
    return false;
  }
}
