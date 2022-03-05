import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/api.login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }
  signUpForm!: FormGroup;
  imageSrc: any;
  userData: any;
  userExistFlag: any;

  ngOnInit(): void {
    this.initialization();
    this.getAllUsers();

  }

  initialization() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(6),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(6),
        ],
      ],
      imageSrc: ['', [Validators.required]]
    });
  }

  getAllUsers() {
    this.loginService.getUsers().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        console.log('err: ', err);
      }
    )
  }

  get f() {
    return this.signUpForm.controls;
  }

  onlyChars(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 97 || charCode > 122) && (charCode < 65 || charCode > 90)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onChangeImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => { this.imageSrc = e.target.result; }
    reader.readAsDataURL(file);
  }

  onSignUp(formData: any) {
    if (this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
      if (this.signUpForm.valid && !this.userExistFlag) {

        formData.value.imageSrc = this.imageSrc;

        this.loginService.saveUser(formData.value).subscribe((res: any) => {
          alert("Registration Succesfull...");
          this.router.navigate(['/sign-in']);
        }, (err: any) => {
          console.log('something went wrong...!');
        });
      } else {
        console.log('please fill all fields');
      }
    } else {
      this.signUpForm.controls['confirmPassword']?.setErrors({
        'Password Mismatch': true,
      });
    }

  }

  checkUser(event: any) {
    this.userExistFlag = false
    const user = this.userData.find((a: any) => {
      return (a.email).toLowerCase() === (this.signUpForm.value.email).toLowerCase();
    });
    this.userExistFlag = user ? true : false;

  }

}
