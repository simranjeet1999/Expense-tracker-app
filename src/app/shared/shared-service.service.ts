import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
userId:any;
  expensesCategory = ['Groceries','Gas bills','Transportation','Travel','Food','Entertainment','Electricity Bills'];
  expensesFormData : any =[]
  incomeFormData :any
  additionalIncomeData:any
  onlyTheExpenseAmount =0
  onlyTheadditionalExpenseAmount:any
  documentID:any
  totalExpense!: number;

  constructor(private firestore: AngularFirestore) { }
  getRecentTransactions(userId: string): Observable<any[]> {
    // Reference to the "users" collection
    const usersCollectionRef = this.firestore.collection('users');
  
    // Reference to the user's document in the "users" collection
    const userDocRef = usersCollectionRef.doc(userId);
  
    // Reference to the "expenses" subcollection within the user document
    const expensesCollectionRef = userDocRef.collection('expenses');
  
    // Fetch all documents from the "expenses" subcollection with their IDs
    return expensesCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        this.onlyTheExpenseAmount = 0;
        return actions.map((a) => {
          console.log('what is this',a.payload.doc.data())
          const data = a.payload.doc.data();
        this.onlyTheExpenseAmount+=data['amount']
        
          const documentId = a.payload.doc.id;
          return { documentId, ...data };
        });
        
      })
    );
    
  }
}
