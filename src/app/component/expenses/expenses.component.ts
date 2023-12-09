import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {

  expenses: any[] = [];
  expenseForm!: FormGroup <any>
  incomeForm! : FormGroup
  newExpense: string = '';
  expenseamount: any;
  selectedExpenseId: any;
  transactionMode: 'new' | 'update' = 'new'
  public chart: any;
  additionalIncomeForm!: FormGroup;
  additionalIncomeFormSubmitted: boolean = false;
  recentTransactions: { description: string; amount: number; }[];
  incomeFormSubmitted!: boolean;
  constructor(private auth:AuthService,private route: ActivatedRoute,private firestore: AngularFirestore,private fb: FormBuilder,public sharedService:SharedServiceService,private afAuth: AngularFireAuth
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
    this.createExpenseForm();
    this.transactionMode='new'
    console.log('check',localStorage.getItem('income_amount'),this.incomeForm.value.incomeAmount)
    this.route.queryParams.subscribe((params) => {
      const transactionData = params['transactionData'];
      
      if (transactionData) {
        // Parse the JSON data and prefill the form
        const parsedData = JSON.parse(transactionData);
        this.expenseForm.patchValue({
          expenseName: parsedData.expenseName,
          amount: parsedData.amount,
          
          expenseDate:parsedData.expenseDate,
          expenseCategory:parsedData.expenseCategory,
          comments: parsedData.comments,
          documentId:parsedData.documentId
          // ... other form controls
        });
        this.transactionMode = 'update';
      }
      
    });
   

  }
  createExpenseForm(): void {
    this.expenseForm = this.fb.group({
      expenseName: ['', Validators.required],
      amount: [null, [Validators.required]],
      expenseDate: [null, Validators.required],
      expenseCategory: [this.sharedService.expensesCategory[0]],
      comments: [''],
      documentId:['']
    });
    this.incomeForm = this.fb.group({
      incomeAmount: [localStorage.getItem('income_amount')? localStorage.getItem('income_amount'):null, [Validators.required, Validators.min(0)]],
      incomeDescription: [localStorage.getItem('income_incomeDescription')? localStorage.getItem('income_incomeDescription'):null,Validators.required]
    });
   // Disable controls if there is data in local storage
if (localStorage.getItem('income_amount')) {
  this.incomeForm.get('incomeAmount')?.disable();
}

if (localStorage.getItem('income_incomeDescription')) {
  this.incomeForm.get('incomeDescription')?.disable();
}

    this.additionalIncomeForm = this.fb.group({
      additionalIncomeAmount: [null, [Validators.required, Validators.min(0)]],
      additionalIncomeDetails: ['']
    });
  }

  submitAdditionalIncome(): void {
    if (this.additionalIncomeForm.valid) {
      this.additionalIncomeFormSubmitted = true;
      // Handle any other logic related to submitting additional income
    }
    this.sharedService.onlyTheadditionalExpenseAmount= Number(this.additionalIncomeForm.value.additionalIncomeAmount)+Number(localStorage.getItem('additional_income_amount'))
    localStorage.setItem('additional_income_amount',this.sharedService.onlyTheadditionalExpenseAmount)
    localStorage.setItem('additional_income_incomeDescription',this.additionalIncomeForm.value.additionalIncomeDetails)
    this.additionalIncomeForm.reset()
  }
  submitIncome(){
    const storedIncomeAmount = localStorage.getItem('income_amount');
  const storedIncomeDescription = localStorage.getItem('income_incomeDescription');
console.log('dvg',storedIncomeAmount,storedIncomeDescription)
  if (storedIncomeAmount && storedIncomeDescription) {
    // If data is present, disable the form controls and set the values
    this.incomeForm.get('incomeAmount')?.disable();
    this.incomeForm.get('incomeDescription')?.disable();

    // Set the stored values to the form controls
    this.incomeForm.patchValue({
      incomeAmount: storedIncomeAmount,
      incomeDescription: storedIncomeDescription
    });

    // Handle any other logic related to submitting income
  } else {
    // If no data in local storage, proceed with regular submission logic
    if (this.incomeForm.valid) {
      this.incomeFormSubmitted = true;
localStorage.setItem('income_amount',this.incomeForm.value.incomeAmount)
localStorage.setItem('income_incomeDescription',this.incomeForm.value.incomeDescription)

      // Handle any other logic related to submitting income
    }

  }
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
    console.log('mode',this.transactionMode);
    (this.sharedService.onlyTheExpenseAmount)+= Number(this.expenseForm.value.amount)
  
    // if (this.expenseForm.valid) {
    //   this.afAuth.authState.subscribe((user) => {
    //     if (user) {
    //       const userId = user.uid;
    //       const expenseData = this.expenseForm.value;

    //       // Reference to the "expenses" collection
    //       const expensesCollectionRef = this.firestore.collection('expenses');

    //       // Reference to the user's document in the "expenses" collection
    //       const userDocRef = expensesCollectionRef.doc(userId);

    //       // Add the expense data to a new document in the "expenses" collection
    //       userDocRef
    //         .collection('userExpenses') // Subcollection for user-specific expenses
    //         .add(expenseData)
    //         .then((docRef) => {
    //           this.selectedExpenseId = docRef.id;
    //           console.log('Expense added to Firestore:', expenseData, this.selectedExpenseId);

    //           // Optionally, reset the form after successful submission
    //           this.expenseForm.reset();
    //         })
    //         .catch((error) => {
    //           console.error('Error adding expense to Firestore:', error);
    //         });
    //     }
    //   });
    // }
    if (this.expenseForm.valid && this.transactionMode === 'new') {
      console.log('called');
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          const expenseData = this.expenseForm.value;
    
          // Reference to the "users" collection
          const usersCollectionRef = this.firestore.collection('users');
    
          // Reference to the user's document in the "users" collection
          const userDocRef = usersCollectionRef.doc(userId);
    
          // Reference to the "expenses" subcollection within the user document
          const expensesCollectionRef = userDocRef.collection('expenses');
    
          // Add the expense data to a new document in the "expenses" subcollection
          expensesCollectionRef
            .add(expenseData)
            .then((docRef) => {
              this.selectedExpenseId = docRef.id;
              console.log('Expense added to Firestore:', expenseData, this.selectedExpenseId);
    
              // Update the document with the generated ID
              docRef.update({ documentId: this.selectedExpenseId })
                .then(() => {
                  console.log('Document ID updated in Firestore:', this.selectedExpenseId);
                })
                .catch((updateError) => {
                  console.error('Error updating document ID in Firestore:', updateError);
                });
                this.expenseForm.reset()
            })
            .catch((error) => {
              console.error('Error adding expense to Firestore:', error);
            });
        }
      });
    }
    
    if(this.expenseForm.valid && this.transactionMode === 'update'){
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          const expenseData = this.expenseForm.value;
  
          // Reference to the "users" collection
          const usersCollectionRef = this.firestore.collection('users');
  
          // Reference to the user's document in the "users" collection
          const userDocRef = usersCollectionRef.doc(userId);
  
          // Reference to the "expenses" subcollection within the user document
          const expensesCollectionRef = userDocRef.collection('expenses');
          console.log('psso',this.expenseForm.value.documentId,expenseData)
          if (this.expenseForm.value.documentId) {
            // Update existing expense if selectedExpenseId is present
            const expenseDocRef = expensesCollectionRef.doc(this.expenseForm.value.documentId);
  
            expenseDocRef
              .update(expenseData)
              .then(() => {
                console.log('Expense updated in Firestore:', expenseData, this.expenseForm.value.documentId);
                this.selectedExpenseId = null; // Reset selectedExpenseId
                this.expenseForm.reset();
              })
              .catch((error) => {
                console.error('Error updating expense in Firestore:', error);
              });
          } 
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
  logOut(){
    this.auth.logout()
  }
  
}
