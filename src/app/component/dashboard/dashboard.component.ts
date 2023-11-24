import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  expenses: any[] = [];
  expenseForm!: FormGroup
  newExpense: string = '';
  selectedExpenseId: any;
  public chart: any;
  recentTransactions: { description: string; amount: number; }[];
  constructor(private firestore: AngularFirestore,private fb: FormBuilder,private sharedService:SharedServiceService,private afAuth: AngularFireAuth
    ) {
    // this.expenses = this.firestore.collection('new-expense').valueChanges();
    this.recentTransactions = [
      { description: 'Transaction 1', amount: 50 },
      { description: 'Transaction 2', amount: 75 },
      // Add more transactions as needed
    ];
    console.log('userdata',this.firestore.collection('expenses').get())
  }


  // ... existing methods

  // Method to update chart data (call this when expenses or income change)

  ngOnInit(): void {
    
    // this.createChart()
    this.getExpenses();
  }
  
  // createChart(){

  //   this.chart = new Chart("MyChart", {
  //     type: 'pie', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	//        datasets: [{
  //   label: 'My First Dataset',
  //   data: [300, 240, 100, 432, 253, 34],
  //   backgroundColor: [
  //     'red',
  //     'pink',
  //     'green',
	// 		'yellow',
  //     'orange',
  //     'blue',			
  //   ],
  //   hoverOffset: 4
  // }],
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }

  //   });
  // }

  getExpenses(): void {
    this.firestore.collection('expenses').get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('doccc',doc)
          // Access individual documents using doc.data()
          this.expenses.push({
            id: doc.id,
            data: doc.data()
          });
        });
      });
      console.log('ccscs',this.expenses)
  }
  addExpense() {
    if (this.newExpense.trim() !== '') {
      this.firestore.collection('expenses').add({ description: this.newExpense });
      this.newExpense = '';
    }
  }

  // deleteExpense(id: string) {
  //   this.firestore.collection('new-expense').doc(id).delete();
  // }
  

}
