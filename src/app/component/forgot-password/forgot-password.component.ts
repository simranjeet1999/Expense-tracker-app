import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  

    email : string = '';

  constructor(private auth : AuthService) { }
  
  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
