import { Component, OnInit, Input } from '@angular/core';
import { CopsService } from '../service.component';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'cops-alert-cards',
  templateUrl: './alert-cards.component.html',
  styleUrls: ['./alert-cards.component.scss']
})
export class AlertCardsComponent implements OnInit {
  @Input() widget;

  alarmCount;
  severityIssues;
  ticketsData;

  constructor(private copsService:CopsService, private utilityService: UtilityService) {
 }

  ngOnInit() {
    this.copsService.getAlarmsCount().subscribe((response)=>{      
      this.alarmCount = response;
    });

  /*  this.copsService.getSeverityIssues().subscribe((response)=>{      
      
      console.log("severityIssues",response);
      this.severityIssues=response;
    });*/
    this.copsService.getTickets().subscribe((response)=>{      
      console.log("getTickets_alertcards",response);
      this.ticketsData=response;
      this.severityIssues=this.ticketsData.count;
    });
    
  }
}
