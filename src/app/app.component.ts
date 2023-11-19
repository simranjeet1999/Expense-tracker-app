import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  myForm = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  });
  static myForm: any;
}
