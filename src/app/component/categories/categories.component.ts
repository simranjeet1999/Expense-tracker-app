import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { MatChipGrid } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  visible = true;
 
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits:any
  selectable = true;
  removable = true;
  newCategory = new FormControl();

  constructor(private sharedService:SharedServiceService){
    this.fruits=this.sharedService.expensesCategory
  }

  addCategory(chiplist:any): void {
    const input = chiplist.input;
    const value = chiplist.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCategory(category: string): void {
    const index = this.fruits.indexOf(category);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  
  }
  
}
