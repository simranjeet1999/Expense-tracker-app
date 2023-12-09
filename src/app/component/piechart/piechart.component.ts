import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Chart } from 'chart.js';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') pieChart!: ElementRef;
  @Input() data: any[] = [];
  userId!: string;

  // ... other properties and dependencies

  constructor(private sharedService: SharedServiceService,private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log('userid',this.userId)
           // Fetch recent transactions
      this.sharedService.getRecentTransactions(this.userId).subscribe((transactions) => {
        // Update the shared service with the fetched data
        this.sharedService.expensesFormData = transactions;
      });
    
      }});
      setTimeout(() => {
        this.generateChartData();
      }, 2000);
  
      console.log('in afterviewinit',this.sharedService.expensesFormData)
  }
  
//   generateChartData() {
//     // Hardcoded labels and amounts
//     // const labels = ['Category A', 'Category B', 'Category C'];
//     // const amounts = [300, 500, 800];
//     console.log('chart works',this.sharedService.expensesFormData)
//     const labels = this.sharedService.expensesFormData.map((data:any) => data.expenseCategory);
//     const amounts = this.sharedService.expensesFormData.map((data:any) => data.amount);
// console.log('test',labels,amounts)
//     // Generate random colors for each category
//     const colors = this.generateRandomColors(labels.length);
//     const ctx = this.pieChart.nativeElement.getContext('2d');
//     // Create the chart data array
//     new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: labels,
//         datasets: [{
//           data: amounts,
//           backgroundColor: this.generateRandomColors(labels.length),
//         }],
//       },
//     });
//   console.log('chartdata',ctx)
    
//   }
generateChartData() {
  const labels = this.data.map((data: any) => data.expenseCategory);
  const amounts = this.data.map((data: any) => data.amount);

  if (labels.length > 0) {
    const colors = this.generateRandomColors(labels.length);
    const ctx = this.pieChart.nativeElement.getContext('2d');
  
    new Chart(ctx, {
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
    // You can implement a logic to generate random colors here
    // For simplicity, using predefined colors
    return ['#FF5733', '#33FF57', '#5733FF', '#FF3366', '#33FFE5'].slice(0, count);
  }
}
