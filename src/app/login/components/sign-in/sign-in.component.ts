import { SubjectService } from './../../../services/subject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private subjectser: SubjectService) { }

  ngOnInit(): void {
  }
  onSignIn() {
    this.subjectser.isLogIn.next(true);
  }

}
