import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
userId:any;
  expensesCategory = ['Groceries','Gas bills','Transportation','Travel','Food','Entertainment','Electricity Bills'];
  constructor() { }
}
