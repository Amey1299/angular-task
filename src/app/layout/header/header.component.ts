import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private subjectser: SubjectService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.subjectser.isLogIn.next(false);
    this.router.navigate(['/sign-in']);
  }
}
