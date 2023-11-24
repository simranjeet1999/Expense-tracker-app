import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {

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

  ngOnInit(): void {
    
    // this.createChart()
    this.getExpenses();
    this.createExpenseForm();
  }
  createExpenseForm(): void {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      status: ['', Validators.required]
    });
  }


  
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
  onSubmit(): void {
    
    if (this.expenseForm.valid) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          const expenseData = this.expenseForm.value;
          const expenseType = expenseData.name; // Assuming you have a 'type' field in the form
         

          // Reference to the "expenses" collection
          const expensesCollectionRef = this.firestore.collection('expenses');

          // Reference to the user's document in the "expenses" collection
          const userDocRef = expensesCollectionRef.doc(userId);

          // Reference to the subcollection based on the expense type
          const expenseTypeCollectionRef = userDocRef.collection(expenseType);

          // Add the expense data to a new document in the subcollection
          expenseTypeCollectionRef.add(expenseData)
            .then(() => {
              this.selectedExpenseId = expensesCollectionRef.doc();
              console.log(`Expense (${expenseType}) added to Firestore:`, expenseData,this.selectedExpenseId);

              // Optionally, reset the form after successful submission
              this.expenseForm.reset();
            })
            .catch(error => {
              console.error('Error adding expense to Firestore:', error);
            });
        }
      });
    }
  }
  getAllExpensesByType(expenseType: string): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
  
        // Reference to the "expenses" collection
        const expensesCollectionRef = this.firestore.collection('expenses');
  
        // Reference to the user's document in the "expenses" collection
        const userDocRef = expensesCollectionRef.doc(userId);
  
        // Reference to the subcollection based on the expense type
        const expenseTypeCollectionRef = userDocRef.collection('simran');
  
        // Get all documents in the subcollection
        expenseTypeCollectionRef.get()
          .subscribe(querySnapshot => {
            const expenses = querySnapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() };
            });
  
            console.log(`All expenses (${expenseType}) under user ${userId}:`, expenses);
          }, error => {
            console.error('Error getting expenses from Firestore:', error);
          });
      }
    });
  }
  
  updateExpense(): void {
    if (!this.expenseForm.valid) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          const expenseData = {
            name:'Existing name',
            id:1234,
            status:true
          }
          const expenseType = 'groceries'; // Assuming you have a 'name' field in the form
  
          // Make sure expenseData.name and this.selectedExpenseId are defined
          if (expenseType) {
            // Reference to the "expenses" collection
            const expensesCollectionRef = this.firestore.collection('expenses');
  
            // Reference to the user's document in the "expenses" collection
            const userDocRef = expensesCollectionRef.doc(userId);
  
            // Reference to the subcollection based on the expense type
            const expenseTypeCollectionRef = userDocRef.collection(expenseType);
  
            // Update the expense data in the specified document in the subcollection
            expenseTypeCollectionRef.doc('viX01AaKRs656nMuZpkr').update({ name: expenseData.name })
              .then(() => {
                console.log(`Expense (${expenseType}) with ID ${this.selectedExpenseId} updated in Firestore:`, expenseData);
  
                // Optionally, reset the form after successful submission
                this.expenseForm.reset();
                this.selectedExpenseId = null; // Reset the selected expense ID
              })
              .catch(error => {
                console.error('Error updating expense in Firestore:', error);
              });
          } else {
            console.error('Expense type or selectedExpenseId is undefined.');
          }
        }
      });
    }
  }
  
  


  deleteExpense(): void {
   
    if (!this.expenseForm.valid) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          const expenseType = 'groceries'; // Assuming you have a 'name' field in the form
    
          // Make sure this.selectedExpenseId is defined
          if (expenseType) {
            // Reference to the "expenses" collection
            const expensesCollectionRef = this.firestore.collection('expenses');
    
            // Reference to the user's document in the "expenses" collection
            const userDocRef = expensesCollectionRef.doc(userId);
    
            // Reference to the subcollection based on the expense type
            const expenseTypeCollectionRef = userDocRef.collection(expenseType);
    
            // Delete the expense document in the specified subcollection
            expenseTypeCollectionRef.doc('viX01AaKRs656nMuZpkr').delete()
              .then(() => {
                console.log(`Expense (${expenseType}) with ID ${this.selectedExpenseId} deleted from Firestore.`);
    
                // Optionally, reset the form after successful deletion
                this.expenseForm.reset();
                this.selectedExpenseId = null; // Reset the selected expense ID
              })
              .catch(error => {
                console.error('Error deleting expense from Firestore:', error);
              });
          } else {
            console.error('Selected expense ID or expense type is undefined.');
          }
        }
      });
    }
  }
  
}
