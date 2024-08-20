import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { CoreModule } from '../core/core.module';
import { BaseItemComponent } from './base-item/base-item.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    ItemComponent,
    ListItemComponent,
    BaseItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule
  ],
  exports:[
    ToolbarComponent,
    ItemComponent,
    ListItemComponent,
    BaseItemComponent
  ]
})
export class SharedModule { }
