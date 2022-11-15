import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  allUsers:any = [];

  constructor(private service: UsersService) { }

  ngOnInit(): void { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.users();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  users(): void {
    this.service.users().subscribe((response: any) => {
      debugger;
      this.allUsers = response;
      this.dtTrigger.next(0);
    });
  }

}
