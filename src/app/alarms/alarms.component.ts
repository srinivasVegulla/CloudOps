import { Component, OnInit } from '@angular/core';
import { CopsService } from '../service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

 

  displayRows;
  alaramsData;
  alaramCountObject = [];
  columns = ['severity', 'ticketid',  'description', 'timeleft'];
  displayColumns = [
    {"displayName": "Severity", "width": "15", "key": "severity"},
     {"displayName": "Ticket Id", "width": "15" , "key": "ticketid"},
    /*  {"displayName": "Alarm Type", "width": "25", "key": "title"}, */
     {"displayName": "Alarm Description", "width": "40", "key": "description"},
     {"displayName": "SLA Time Left", "width": "30", "key": "timeleft"}
  ]
       
    
  
  rows = [{
    "severity": "Critical",
    "ticketid": "111",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },
  {
    "severity": "Critical",
    "ticketid": "222",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },
  {
    "severity": "Minor",
    "ticketid": "333",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },
  {
    "severity": "Major",
    "ticketid": "444",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },{
    "severity": "Critical",
    "ticketid": "555",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },{
    "severity": "Major",
    "ticketid": "666",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },{
    "severity": "Critical",
    "ticketid": "777",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  },{
    "severity": "Critical",
    "ticketid": "888",
    "title": "Memory",
    "description": "Medium High Memory",
    "timeleft": "10Min"
  }
  ];

  constructor(
    private copsService:CopsService,
    private router: Router
    ) { }

  ngOnInit() {
    /* this.displayRows = this.rows.splice(0,5); */
    this.getAlaramsData();
  }

  getAlaramsData(){
    this.copsService.getAlaramsData().subscribe((response)=>{      
      this.alaramsData = response['tickets'];
      let countObj = response['count'];
      this.prepareCardsData(countObj);
      this.displayRows = this.alaramsData.splice(0,5);
    });
  }

  prepareCardsData(response){
    for(var i = 0 ; i < response.length; i++) {
      let obj = {};
      obj['type'] = response[i].severity;
      obj['count'] =  response[i].count;
      if(response[i].severity == 'Major') {
        obj['imagePath'] = "assets/images/major.png";
      } else {
        obj['imagePath'] = "assets/images/" + response[i].severity +".png";
      }
      this.alaramCountObject.push(obj);
    }
  }

  getValue(row, column) {
    let key = column['key'];
    return row[key];
  }

  goToTicketsPage(){
    this.router.navigate(['/home/tickets']);
  }

  goToTicketstDetailsPage(rowData){
    this.copsService.changeIsAlertSelected(true);
    this.router.navigate(['home/ticketdetails/',rowData.ticketid,rowData.status,'tickets',rowData.severity]);
  }

}
