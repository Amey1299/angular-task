import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private subjectser: SubjectService, private router: Router, private sessionservice: SessionService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionservice.isLoggedin();
    if (!this.isLoggedIn) {
      this.subjectser.isLogIn.subscribe(res => this.isLoggedIn = res);
    }
  }
  onLogout() {
    this.sessionservice.flushStorage();
    this.subjectser.isLogIn.next(false);
    this.router.navigate(['/sign-in']);
  }
}
