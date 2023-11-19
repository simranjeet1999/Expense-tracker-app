import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,ReactiveFormsModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  // it('should render paragraph', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content p')?.textContent).toContain('happy');
  // });
  it('should validate mobile number', () => {
    const mobileNumberControl = AppComponent.myForm.get('mobileNumber');

    // Valid mobile number
    mobileNumberControl.setValue('1234567890');
    expect(mobileNumberControl.valid).toBeTruthy();

    // Invalid mobile number (less than 10 digits)
    mobileNumberControl.setValue('12345');
    expect(mobileNumberControl.valid).toBeFalsy();

    // Invalid mobile number (more than 10 digits)
    mobileNumberControl.setValue('123456789012');
    expect(mobileNumberControl.valid).toBeFalsy();

    // Invalid mobile number (contains non-numeric characters)
    mobileNumberControl.setValue('1234abcd56');
    expect(mobileNumberControl.valid).toBeFalsy();

    // Invalid mobile number (empty)
    mobileNumberControl.setValue('');
    expect(mobileNumberControl.valid).toBeFalsy();
  });
  
});
