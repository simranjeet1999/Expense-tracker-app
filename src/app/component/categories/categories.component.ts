import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { MatChipGrid } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: string[] = ['Groceries', 'Clothing', 'Electronics']
  newCategory: string = '';
constructor(private sharedService: SharedServiceService, private auth:AuthService){
this.categories = this.sharedService.expensesCategory
}
  addCategory(): void {
    const category = this.newCategory.trim();
    if (category && !this.categories.includes(category)) {
      this.categories.push(category);
      this.newCategory = '';
    }
    this.sharedService.expensesCategory=this.categories
  }

  removeCategory(index: number): void {
    this.categories.splice(index, 1);
    this.sharedService.expensesCategory=this.categories

  }
  logOut(){
    this.auth.logout()
  }
  
  
}
