import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CopsService } from '../service.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ticket-details-page',
  templateUrl: './ticket-details-page.component.html',
  styleUrls: ['./ticket-details-page.component.scss']
})
export class TicketsDetailsPageComponent implements OnInit {

  constructor(private copsService : CopsService,private route:ActivatedRoute) { }
  isalertObjectSubscription;
  alertObject;
  ticketId;
  ticketDetails;
  filteredDetails;
  ticketDiv="";
  tickets;
  minorslicedticket=[];
  criticalslicedticket=[];
  majorslicedticket=[];
  ticketstatus;
  ticketStatus;
  tickettab;
ticketdata;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get("ticketId");
      this.ticketDiv = this.ticketId;
      this.ticketStatus = params.get("ticketstatus");
      this.ticketstatus = params.get("ticketSeverity");
      this.tickettab = params.get("tickettab");
    });
   

    this.copsService.changeIsAlertSelected(true);

    this.isalertObjectSubscription = this.copsService.isAlertSelected.subscribe(value => {
      this.alertObject = value;
    //  console.log("alertObject in alert details",this.alertObject);
    });
    this.fetchtickets();
  
  }
  ngOnChanges(changes: SimpleChanges){

   this.fetchtickets();
  }
  fetchtickets() {
    this.copsService.getTickets().subscribe((response)=>{  
      this.ticketdata=response;
      this.tickets=this.ticketdata.tickets;
      this.filteredDetails = this.tickets;
      this.setMajorMinorCritical();
    });
  }
//ngOnchanges as alert details
  selectTicket(ticket) {
    this.ticketId = ticket.ticketid;
    this.ticketDiv = this.ticketId;
    this.ticketstatus = ticket.severity;
    this.ticketStatus = ticket.status;
  }

  updateFilter(event, colName) {
    let temp;
    let searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      this.filteredDetails = this.tickets;
    } else {
      temp = this.tickets.filter(function(currItem) {
      return currItem[colName].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
    });
    this.filteredDetails = temp;
    }
    this.setMajorMinorCritical();
  }

  setMajorMinorCritical() {
    let criticalTickets = [];
    let majorTickets=[];
    let minorTickets=[];
    for (let i=0; i< this.filteredDetails.length; i++) {
      if(this.filteredDetails[i].severity == "Critical"){
        criticalTickets.push(this.filteredDetails[i]);
       
      } else if(this.filteredDetails[i].severity == "Major"){
        majorTickets.push(this.filteredDetails[i]);
       
      } else if(this.filteredDetails[i].severity == "Minor"){
        minorTickets.push(this.filteredDetails[i]);
      
      }
    }
    this.criticalslicedticket = criticalTickets.slice(0,5);
    this.majorslicedticket = majorTickets.slice(0,5);
    this.minorslicedticket = minorTickets.slice(0,5);
  }
}