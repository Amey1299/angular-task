import { SessionService } from './../../../services/session.service';
import { SubjectService } from './../../../services/subject.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/api.login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  errMessage: boolean = false;
  constructor(private subjectser: SubjectService, private fb: FormBuilder, private loginservice: LoginService, private session: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.initialization();
  }
  initialization() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.signInForm.controls;
  }
  // onSignIn() {
  //   this.subjectser.isLogIn.next(true);
  // }
  onSignIn(formData: any) {
    if (this.signInForm.valid) {
      this.loginservice.getUsers().subscribe((res: any) => {
        const checkCreds = res.find((a: any) => {
          return a.email === formData.value.email && a.password === formData.value.password
        });
        if (checkCreds) {
          let info = {
            id: checkCreds.id,
            firstName: checkCreds.firstName,
            lastName: checkCreds.lastName,
            email: checkCreds.email,
            dob: checkCreds.dob,
          };
          this.session.setAuthToken(`${checkCreds.firstName}.${checkCreds.lastName}`);
          this.session.setUser(JSON.stringify(info));
          this.subjectser.isLogIn.next(true);
          this.router.navigate(['profile']);
        } else {
          this.errMessage = true;
        }
      });
    }
  }

}
