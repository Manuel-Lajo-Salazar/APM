import {Component, HostBinding, OnInit} from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'pm-login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'login-page app';

  constructor() {}

  ngOnInit() {
    jQuery('.prime-sidebar').hide();
    jQuery('.navbar-dashboard').hide();
  }

}
