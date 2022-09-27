import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  user: User;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response: User) => {
        console.log('nav.login().response');
        console.log(response);
        this.user = response;
      },
      (error) => {
        console.log('nav.login().error');
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logout();
  }
}
