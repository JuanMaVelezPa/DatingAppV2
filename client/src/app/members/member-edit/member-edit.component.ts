import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_models/member';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      (resp) => {
        this.user = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(
      (resp) => {
        this.member = resp;
      },
      (error) => {}
    );
  }

  updateMember() {
    this.membersService.updateMember(this.member).subscribe(
      (resp) => {
        this.toastr.success('Profile updated succesfully');
        this.editForm.reset(this.member);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
