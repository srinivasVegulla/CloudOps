import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CopsService } from '../service.component';

@Component({
  selector: 'cops-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isSideNavOpen:boolean = false;
  activatedLink = 'dashboard';
  splitedLinks;
  hero$;

  constructor(private route: ActivatedRoute,private copsService:CopsService,
    private router: Router, private loginService: LoginService ) { 
    
  }
  isalertSelectedSubscription;
  isalertSelected;
  ngOnInit() {
  this.splitedLinks = window.location.pathname.split('/');
  this.activatedLink = this.splitedLinks[this.splitedLinks.length -1];
  this.isalertSelectedSubscription = this.copsService.isAlertSelected.subscribe(value => {
    this.isalertSelected = value;
  });

  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.copsService.changeIsSideNavOpen(this.isSideNavOpen);
  }

  setActiveLink(activeLink) {
    this.activatedLink = activeLink;
  }

  logout() {
    localStorage.clear();
    this.copsService.changeIsAlertSelected(false);
    this.router.navigate(['/login']);
  }

  goToDashboardPage() {
    this.copsService.changeIsAlertSelected(false);
    this.router.navigate(['home/dashboard']);
  }

  ngOnDestroy() {
    if (this.isalertSelectedSubscription) {
      this.isalertSelectedSubscription.unsubscribe();
    }
  }

}
