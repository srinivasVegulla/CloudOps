import { Component, OnInit } from '@angular/core';
import { CopsService } from '../service.component';

@Component({
  selector: 'cops-periodic-activities',
  templateUrl: './periodic-activities.component.html',
  styleUrls: ['./periodic-activities.component.scss']
})
export class PeriodicActivitiesComponent implements OnInit {

  displayRows;
  periodicActivityData;
  columns = ['activityname', 'location', 'description', 'date'];
  displayColumns = [
    {"displayName": "Activity Name", "width": "30", "key": "activityname"},
    {"displayName": "Location", "width": "20" , "key": "location"},
    {"displayName": "Description", "width": "30", "key": "description"},
    {"displayName": "Date", "width": "20", "key": "date"},
  ];
       
  rows = [{
    "activityname": "Security Patches",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  },{
    "activityname": "Backup",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  },{
    "activityname": "Certificate Expiring",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  },{
    "activityname": "Licence Expiring",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  },{
    "activityname": "Patch Activity",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  },{
    "activityname": "Security Patches 2",
    "location": "USA",
    "description": "Adobe Data Licence",
    "date": "14-08-2020",
  }

  ];

  constructor(private copsService:CopsService) { }

  ngOnInit() {
    /* this.displayRows = this.rows.splice(0,5); */
    this.getPeriodicActivitiesData();
  }

  getPeriodicActivitiesData(){
    this.copsService.getPeriodicActivitiesData().subscribe((response)=>{      
      this.periodicActivityData = response;
      this.displayRows = this.periodicActivityData.splice(0,5);
    });
  }
  getValue(row, column) {
    let key = column['key'];
    return row[key];
  }

}
