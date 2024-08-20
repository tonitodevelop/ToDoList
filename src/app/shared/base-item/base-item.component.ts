import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoDetail } from 'src/app/core/models/todo-details';

@Component({
  template: ""
})
export class BaseItemComponent<T extends TodoDetail> {
  @Input() item: T | undefined;
  @Output() itemCheck: EventEmitter<T> = new EventEmitter<T>();

  itemSelected: T | undefined;

  onSelectItemChange(ob: MatCheckboxChange, item: T): void {

    if (ob.checked) {
      this.itemSelected = item;
    }
    else {
      this.itemSelected = undefined;
    }
    this.itemCheck.emit(this.itemSelected);

  }
}
