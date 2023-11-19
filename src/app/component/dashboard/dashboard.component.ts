import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  expenses: Observable<any[]>;
  newExpense: string = '';

  constructor(private firestore: AngularFirestore) {
    this.expenses = this.firestore.collection('new-expense').valueChanges();
  }

  addExpense() {
    if (this.newExpense.trim() !== '') {
      this.firestore.collection('new-expense').add({ description: this.newExpense });
      this.newExpense = '';
    }
  }

  deleteExpense(id: string) {
    this.firestore.collection('new-expense').doc(id).delete();
  }
}
