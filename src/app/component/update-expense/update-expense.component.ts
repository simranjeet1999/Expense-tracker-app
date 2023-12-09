import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss']
})
export class UpdateExpenseComponent {
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.fb.group({
      // Define your form controls here based on your data structure
      expenseName: [data.transactionData.expenseName, Validators.required],
      amount: [data.transactionData.amount, Validators.min(0)],
      // ... other form controls
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    // Implement your update logic here
    // You can access the updated form values using this.updateForm.value
    // Close the dialog when the update is complete
    this.dialogRef.close();
  }
}
