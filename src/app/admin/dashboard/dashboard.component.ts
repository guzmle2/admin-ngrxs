import {Component, Injector, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  adminsService = this.injector.get(AdminService);

  constructor(protected injector: Injector) {
    this.adminsService.initAdminListener();
  }

  ngOnInit() {
  }

}
