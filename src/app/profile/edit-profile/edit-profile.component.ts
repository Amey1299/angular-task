import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../login/services/api.login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  imageSrc: any;
  userData: any;
  constructor(private sessionservice: SessionService, private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialization();
    this.assignment();
  }
  initialization() {
    this.profileForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }
  assignment() {
    let data: any = JSON.parse(this.sessionservice.getUser()!);

    this.loginService.getUserById(data.id).subscribe(
      (res: any) => {
        this.userData = res;
        this.imageSrc = res.imageSrc;
        this.profileForm.patchValue({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          password: res.password,
          imageSrc: res.imageSrc
        });
      },
      (err: any) => {
        console.log("ERR :", err);
      }
    )
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

  get f() {
    return this.profileForm.controls;
  }

  onUpdate(formData: any) {

    if (formData.valid) {

      formData.value.imageSrc = this.imageSrc;

      this.loginService.editUser(formData.value).subscribe((res: any) => {
        alert('user upadated successfully...');
      }, (err: any) => {
        console.log('something went wrong...!');
      });


    } else {
      console.log('please enter valid data');
    }

  }

  onCancle() {
    this.profileForm.patchValue({
      id: this.userData.id,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      password: this.userData.password,
      imageSrc: this.userData.imageSrc
    });
    this.imageSrc = this.userData.imageSrc;
  }

}
