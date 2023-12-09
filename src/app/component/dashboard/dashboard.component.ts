// import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { SharedServiceService } from 'src/app/shared/shared-service.service';
// import Chart from 'chart.js/auto';
// import { MatDialog } from '@angular/material/dialog';
// import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/shared/auth.service';
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements AfterViewInit {
//   expenses: any[] = [];
//   expenseForm!: FormGroup
//   newExpense: string = '';
//   selectedExpenseId: any;
//   public chart: any;
//   @ViewChild('pieChart') pieChart!: ElementRef;

//   incomeData:any
//   total=0;
//   recentTransactions: { description: string; amount: number; }[];
//   additionalincomedata: any;
//   totalBAlance: any;
//   userId!: string;
//   isExpenseGreater!: boolean;
//   variableForExpense!: number;
//   groupedExpenses!: any[];
//   constructor(private auth:AuthService,private router: Router,private dialog: MatDialog,private firestore: AngularFirestore,private fb: FormBuilder,public sharedService:SharedServiceService,private afAuth: AngularFireAuth
//     ) {
//     // this.expenses = this.firestore.collection('new-expense').valueChanges();
//     this.recentTransactions = [
//       { description: 'Transaction 1', amount: 50 },
//       { description: 'Transaction 2', amount: 75 },
//       // Add more transactions as needed
//     ];
//   }


//   // ... existing methods

//   // Method to update chart data (call this when expenses or income change)

//   ngOnInit(): void {
//     console.log('userdata',this.sharedService.expensesFormData,this.sharedService.onlyTheExpenseAmount)

//    this.incomeData= localStorage.getItem('income_amount')
//    this.additionalincomedata =localStorage.getItem('additional_income_amount')
//    this.total = Number(this.incomeData)+Number(this.additionalincomedata)
//     // this.createChart()
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         this.userId = user.uid;
//         console.log('userid',this.userId)
//            // Fetch recent transactions
//       this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
//         // Update the shared service with the fetched data
//         this.sharedService.expensesFormData = transactions;
//         this.groupedExpenses = this.groupAndSumExpenses(transactions);
//         this.chart = this.groupedExpenses;
//       });
//       }});
//      setTimeout(() => {

//       this.totalBAlance=this.total- Number(this.sharedService.onlyTheExpenseAmount)
//       console.log(this.totalBAlance,this.total,this.sharedService.onlyTheExpenseAmount)
    
//       if(this.sharedService.onlyTheExpenseAmount > this.total){
//         this.isExpenseGreater =true
//       }
//       else{
//         this.isExpenseGreater=false
//       }
//       this.variableForExpense=this.sharedService.onlyTheExpenseAmount
//      }, 2000)
//   }

//   ngAfterViewInit(): void {
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         this.userId = user.uid;
//         console.log('userid',this.userId)
//            // Fetch recent transactions
//       this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
//         // Update the shared service with the fetched data
//         this.sharedService.expensesFormData = transactions;
//       });
    
//       }});
//       setTimeout(() => {
//         this.generateChartData();
//       }, 2000);
  
//       console.log('in afterviewinit',this.sharedService.expensesFormData)
//   }
//   generateChartData() {
//     const labels = this.sharedService.expensesFormData.map((data: any) => data.expenseCategory);
//     const amounts = this.sharedService.expensesFormData.map((data: any) => data.amount);
  
//     if (labels.length > 0) {
//       const colors = this.generateRandomColors(labels.length);
//       const ctx = this.pieChart.nativeElement.getContext('2d');
    
//       new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: labels,
//           datasets: [
//             {
//               data: amounts,
//               backgroundColor: this.generateRandomColors(labels.length),
//             },
//           ],
//         },
//       });
//     }
//   }
  
//     generateRandomColors(count: number): string[] {
//       // You can implement a logic to generate random colors here
//       // For simplicity, using predefined colors
//       return ['#FF5733', '#33FF57', '#5733FF', '#FF3366', '#33FFE5'].slice(0, count);
//     }
 
//   groupAndSumExpenses(expenses: any[]): any[] {
//     const groupedExpenses: any[] = [];

//     expenses.forEach((expense) => {
//       const index = groupedExpenses.findIndex((group) => group.expenseCategory === expense.expenseCategory);

//       if (index !== -1) {
//         // Category already exists, add amount
//         groupedExpenses[index].amount += expense.amount;
//       } else {
//         // New category, add to the array
//         groupedExpenses.push({ expenseCategory: expense.expenseCategory, amount: expense.amount });
//       }
//     });

//     return groupedExpenses;
//   }
  

//   updateTransaction(transaction: any,documentID:any): void {
//     // Navigate to the 'expenses' component and pass the transaction data as a query parameter
//     console.log('what data is going',transaction,documentID)
//     this.router.navigate(['/expenses'], { queryParams: { transactionData: JSON.stringify(transaction) } });
//   }
//   // createChart(){

//   //   this.chart = new Chart("MyChart", {
//   //     type: 'pie', //this denotes tha type of chart

//   //     data: {// values on X-Axis
//   //       labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
// 	//        datasets: [{
//   //   label: 'My First Dataset',
//   //   data: [300, 240, 100, 432, 253, 34],
//   //   backgroundColor: [
//   //     'red',
//   //     'pink',
//   //     'green',
// 	// 		'yellow',
//   //     'orange',
//   //     'blue',			
//   //   ],
//   //   hoverOffset: 4
//   // }],
//   //     },
//   //     options: {
//   //       aspectRatio:2.5
//   //     }

//   //   });
//   // }

// //   deleteTransaction(transaction: any,documentID:any){
// //     this.afAuth.authState.subscribe((user) => {
// //       if (user) {
// //         const userId = user.uid;
// //     const documentIdToDelete = documentID
// //     console.log('document to be deleted',documentIdToDelete)
// //     // Reference to the "users" collection
// //     const usersCollectionRef = this.firestore.collection('users');

// //     // Reference to the user's document in the "users" collection
// //     const userDocRef = usersCollectionRef.doc(userId); // Replace 'currentUserId' with the actual user ID

// //     // Reference to the "expenses" subcollection within the user document
// //     const expensesCollectionRef = userDocRef.collection('expenses');

// //     // Reference to the document
// //     const documentRef = expensesCollectionRef.doc(documentIdToDelete);

// //     // Delete the document
// //     documentRef.delete()
// //       .then(() => {
// //         console.log('Expense deleted successfully.');
// //       })
// //       .catch((error) => {
// //         console.error('Error deleting expense:', error);
// //       });
    
// // }
// //     })
// //   }
// deleteTransaction(transaction: any, documentID: any) {
//   this.afAuth.authState.subscribe((user) => {
//     if (user) {
//       const userId = user.uid;
//       const documentIdToDelete = documentID;

//       // Reference to the "users" collection
//       const usersCollectionRef = this.firestore.collection('users');

//       // Reference to the user's document in the "users" collection
//       const userDocRef = usersCollectionRef.doc(userId);

//       // Reference to the "expenses" subcollection within the user document
//       const expensesCollectionRef = userDocRef.collection('expenses');

//       // Reference to the document
//       const documentRef = expensesCollectionRef.doc(documentIdToDelete);

//       // Get the amount of the expense to be deleted
//       const expenseAmount = transaction.amount;

//       // Delete the document
//       documentRef
//         .delete()
//         .then(() => {
//           console.log('Expense deleted successfully.');
//           if(this.sharedService.onlyTheExpenseAmount > this.total){
//             this.isExpenseGreater =true
//           }
//           else{
//             this.isExpenseGreater=false
//           }
//           this.ngOnInit()
//           // Update the total balance after deleting the expense
//           userDocRef
//             .get()
//             .subscribe((doc) => {
              
//               console.log('Total balance updated successfully.');

//             });
//         })
//         .catch((error) => {
//           console.error('Error deleting expense:', error);
//         });
//     }
//   });
// }

//   logOut(){
//     this.auth.logout()
//   }
  

// }
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  expenses: any[] = [];
  expenseForm!: FormGroup
  newExpense: string = '';
  selectedExpenseId: any;
  public chart: any;
  @ViewChild('pieChart') pieChart!: ElementRef;

  incomeData: any;
  total = 0;
  recentTransactions: any[] = [];
  additionalincomedata: any;
  totalBAlance: any;
  userId!: string;
  isExpenseGreater!: boolean;
  variableForExpense!: number;
  groupedExpenses: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    public sharedService: SharedServiceService,
    private afAuth: AngularFireAuth
  ) {
    this.recentTransactions = [
      { description: 'Transaction 1', amount: 50, expenseCategory: 'Category 1' },
      { description: 'Transaction 2', amount: 75, expenseCategory: 'Category 2' },
      // Add more transactions as needed
    ];
  }

  // ... existing methods

  ngOnInit(): void {
    this.incomeData = localStorage.getItem('income_amount');
    this.additionalincomedata = localStorage.getItem('additional_income_amount');
    this.total = Number(this.incomeData) + Number(this.additionalincomedata);

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
          this.sharedService.expensesFormData = transactions;
          this.groupedExpenses = this.groupAndSumExpenses(transactions);
          this.chart = this.groupedExpenses;
        });
      }
    });

    setTimeout(() => {
      this.totalBAlance = this.total - Number(this.sharedService.onlyTheExpenseAmount);
      if (this.sharedService.onlyTheExpenseAmount > this.total) {
        this.isExpenseGreater = true;
      } else {
        this.isExpenseGreater = false;
      }
      this.variableForExpense = this.sharedService.onlyTheExpenseAmount;
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
          this.sharedService.expensesFormData = transactions;
        });
      }
      setTimeout(() => {
        this.generateChartData();
      }, 2000);
    });
  }

  generateChartData() {
    const labels = this.groupedExpenses.map((data:any) => data.expenseCategory);
    const amounts = this.groupedExpenses.map((data:any) => data.amount);

    if (labels.length > 0) {
      const colors = this.generateRandomColors(labels.length);
      const ctx = this.pieChart.nativeElement.getContext('2d');

      this.chart=new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: amounts,
              backgroundColor: this.generateRandomColors(labels.length),
            },
          ],
        },
      });
    }
    
  }

  
  
  

  generateRandomColors(count: number): string[] {
    return ['#FF5733', '#33FF57', '#5733FF', '#FF3366', '#33FFE5'].slice(0, count);
  }

  groupAndSumExpenses(expenses: any[]): any[] {
    const groupedExpenses: any[] = [];

    expenses.forEach((expense) => {
      const index = groupedExpenses.findIndex((group) => group.expenseCategory === expense.expenseCategory);

      if (index !== -1) {
        groupedExpenses[index].amount += expense.amount;
      } else {
        groupedExpenses.push({ expenseCategory: expense.expenseCategory, amount: expense.amount });
      }
    });

    return groupedExpenses;
  }

  updateTransaction(transaction: any, documentID: any): void {
    this.router.navigate(['/expenses'], { queryParams: { transactionData: JSON.stringify(transaction) } });
  }

  deleteTransaction(transaction: any, documentID: any) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        const documentIdToDelete = documentID;

        const usersCollectionRef = this.firestore.collection('users');
        const userDocRef = usersCollectionRef.doc(userId);
        const expensesCollectionRef = userDocRef.collection('expenses');
        const documentRef = expensesCollectionRef.doc(documentIdToDelete);

        const expenseAmount = transaction.amount;

        documentRef
          .delete()
          .then(() => {
            console.log('Expense deleted successfully.');
            this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
              this.sharedService.expensesFormData = transactions;
              this.groupedExpenses = this.groupAndSumExpenses(transactions);
              this.generateChartData();
            });
            if (this.sharedService.onlyTheExpenseAmount > this.total) {
              this.isExpenseGreater = true;
            } else {
              this.isExpenseGreater = false;
            }
            window.location.reload();
            userDocRef.get().subscribe(() => {
              console.log('Total balance updated successfully.');
              // Update the chart data and re-render the chart after successful deletion
              
            });
          })
          .catch((error) => {
            console.error('Error deleting expense:', error);
          });
      }
    });
  }

  logOut() {
    this.auth.logout();
  }
}
