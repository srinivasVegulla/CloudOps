import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'cops-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSideNavOpen:boolean = false;
  activatedLink = 'dashboard';
  splitedLinks;
  hero$;

  constructor(private route: ActivatedRoute,
    private router: Router, private loginService: LoginService ) { 
    
  }

  ngOnInit() {
  //  console.log("hi router ", this._route.url);
  this.splitedLinks = window.location.pathname.split('/');
  this.activatedLink = this.splitedLinks[this.splitedLinks.length -1];
  }

  toggleSideNav() {
    console.log("entered", this.isSideNavOpen);
    this.isSideNavOpen = !this.isSideNavOpen;
    console.log("completed",this.isSideNavOpen);
  }

  setActiveLink(activeLink) {
    this.activatedLink = activeLink;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
