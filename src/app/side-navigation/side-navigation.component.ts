import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cops-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {


  @Input() isSideNavOpen;
  activatedLink = 'dashboard';
  splitedLinks;

  constructor() { 
  }

  ngOnInit() {
    this.splitedLinks = window.location.pathname.split('/');
    this.activatedLink = this.splitedLinks[this.splitedLinks.length -1];
  }


  setActiveLink(activeLink) {
    this.activatedLink = activeLink;
  }
}
