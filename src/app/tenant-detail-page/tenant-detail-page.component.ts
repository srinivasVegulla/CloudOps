import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'cops-tenant-detail-page',
  templateUrl: './tenant-detail-page.component.html',
  styleUrls: ['./tenant-detail-page.component.scss']
})
export class TenantDetailPageComponent implements OnInit {

  @Input() tenant;
  @Output() closeDetailPage =  new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  goToTenantsList() {
    this.closeDetailPage.emit();
  }

}
