import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CopsService } from '../service.component';
import {Router,ActivatedRoute} from '@angular/router';
declare var $: any;
//import * as $ from 'jquery';

@Component({
  selector: 'cops-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
  
})
export class TicketsComponent implements OnInit {

  logInsightData;
  rows = [];
  //totalRecords = [];
  rowsPerPage = 10;
  recperpage = [5,10,15,20];
  totalPages=1;
  currentPage = 1;
  isalertSelectedSubscription;
  isalertSelected = false;
  activeTab = "tickets";
  isTicketModal;
  tid;
  isAssignModal;
  isTroubleshoot;
  responseData=[];
  historyData;
  ticketsData;
  modifyTicket;
  modifyAssignee;
  modifyStatus;
  datetime;
  assignSuccess=false;
  TroubleshootSuccess=false;
  createSuccess=false;
  splitdate=[];
  titlewidth;
  dateandtimewidth;
  personassignedwidth;
  severitywidth;
  @Output() modalopen = new EventEmitter();
  searchObj = [];
  filteredData = [];

  constructor(private copsService:CopsService,private router:Router,private route:ActivatedRoute) { 
    
  }
 
  ngOnInit() {
    this.isalertSelectedSubscription = this.copsService.isAlertSelected.subscribe(value => {
      this.isalertSelected = value;
    });
    
  /*  this.copsService.getAlertsTableData().subscribe((response)=>{      
      this.logInsightData = response["hits"]["hits"];
      let data = [];
      for(let i=0; i<this.logInsightData.length; i++) {
        data.push(this.logInsightData[i]["_source"]);
      }
      this.totalRecords = data;
      this.calculatePages();
    });*/
    this.fetchNewTickets();
    this.copsService.getTicketsHistory().subscribe((response)=>{      
      
      this.historyData = response;
      
    });
   this.datetime= "2 days, 12:12:34.76";
 //  this.splitdate=this.datetime.split(',');
  //  console.log(this.splitdate,"splitdate");
 
  }
  fetchNewTickets(){
    this.copsService.getTickets().subscribe((response)=>{      
      this.ticketsData = response;
      this.responseData = this.ticketsData.tickets;
      this.filteredData = this.responseData;
      this.searchObj = [];
      this.calculatePages();
    });
  }
//autoresize with timout
  updateFilter(event, colName, innerColname) {
    
    let searchValue = event.target.value.toLowerCase();
    let matchFound = false;
    //If searchObj has elements and typed column belongs to any available searchObj
    if (this.searchObj.length > 0) {
      this.searchObj.map((ele) => {
        if (ele.key == colName) {
          ele.value = searchValue;
          matchFound = true;
        }
      });
    }

    //If typed column is not there in searchObj push that Column to search
    if (!matchFound) {
      this.searchObj.push({
        'key': colName,
        'value': searchValue
      });
    };

    //Filter only to have non empty Search Criteria
    let finalSearchObj = this.searchObj.filter((obj) => {
      return (obj.value != '');
    });

    //Every Time reset the filtered data
    this.filteredData = [];

    

    if (finalSearchObj.length > 0) {
      for (let i = 0; i < finalSearchObj.length; i++) {
        let key = finalSearchObj[i].key;
        let searchTextCol = finalSearchObj[i].value;
        //first element searches from whole available devices
        if (i == 0) {
          this.filteredData = this.responseData.filter(function(currItem) {       
            if(key =='ticketid') {
              return currItem[key].toString().indexOf(searchTextCol) !== -1
            } else {
               return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1 
            }  
          });
        } else {
          //After first element searches from already filtered elements
          this.filteredData = this.filteredData.filter(function(currItem) {           
            if(key =='ticketid') {
              return currItem[key].toString().indexOf(searchTextCol) !== -1
            } else {
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1  
            }       
          });
        }
      }
    } else {
      this.filteredData = this.responseData;
    }

    this.calculatePages();  
   /*  if (!searchValue) {
      this.rows = this.responseData;
    }
    let temp;
    if (innerColname) {
       temp = this.responseData.filter(function(currItem) {
        return currItem[colName][innerColname].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
    } else {
      if(colName=='ticketid'){
        temp = this.responseData.filter(function(currItem) {
          return currItem[colName].toString().indexOf(searchValue) !== -1 || !searchValue;
        });
      } else {
        temp = this.responseData.filter(function(currItem) {
          return currItem[colName].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
        });
      }
    } */
  }
  calculatePages() {
    if(!this.filteredData){
      this.totalPages = 1;
      this.filteredData = [];
    }else{
      this.totalPages = ((this.filteredData.length % this.rowsPerPage) == 0) ? (this.filteredData.length / this.rowsPerPage): Math.ceil(this.filteredData.length /this.rowsPerPage);
      this.paginate();
    }
  }
  

  updateRecPerPage(page) {
    this.rowsPerPage = page;
    this.currentPage = 1;
    this.calculatePages();
  }

  paginate() {
    this.rows = this.filteredData.slice(((this.currentPage-1)*this.rowsPerPage), ((this.currentPage)*this.rowsPerPage));
  }

  previous() {
    this.currentPage -= 1;
    this.paginate();
  }
  next() {
    this.currentPage += 1;
    this.paginate();
  }

  /*onActivate(event) {
    if(event.type == 'click') {
       console.log("hiiii", event.row['ticketID']);
       this.copsService.changeIsAlertSelected(true);
       this.copsService.changeAlertObject(event.row);
    }
  }*/

  setTableTab(tabName) {
    this.activeTab = tabName;
    this.searchObj = [];
    if(this.activeTab == 'tickets'){
      this.responseData = this.ticketsData.tickets;
      this.filteredData = this.responseData;
      this.severitywidth = 150;//150
      this.titlewidth = 130;//130
      this.dateandtimewidth = 150;//130
      this.personassignedwidth = 150;//150
      
    }else if(this.activeTab == 'history'){
      this.severitywidth=150;//150
      this.responseData=this.historyData;
      this.filteredData = this.responseData;
      this.titlewidth = 200;//200
      this.dateandtimewidth = 260;//260
      this.personassignedwidth = 280;//280
    }
    this.calculatePages();
    $('.tableInputContainer input[type=text]').val('');
    $('#reset').val('');
   
      
  }
  ngAfterViewInit(){
    setTimeout(() => {
      $('#mainNgxTable .datatable-scroll').width('100%');
  }, (500));
  }
  ngOnDestroy() {
    if (this.isalertSelectedSubscription) {
      this.isalertSelectedSubscription.unsubscribe();
    }
  }
  openModal(){
     this.isTicketModal=true;
  }
  openAssignModal(ticketId,Assignedto,status1){
//In Progress Divya tirumala
    this.isAssignModal=true;
    setTimeout(() => {
    
      this.isAssignModal=true;
      $('.selectpicker').selectpicker('refresh');
     
      }, 1500);
  //  this.isAssignModal=true;
    $('.selectpicker').selectpicker('refresh');
    this.modifyTicket=ticketId;
    this.modifyAssignee=Assignedto;
    this.modifyStatus=status1;

  }
  refreshSelect() {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      }, 500);
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      });
    $('.selectpicker').selectpicker('refresh');
  }
  openTroubleshoot(ticketId){
  this.isTroubleshoot=true;
  this.modifyTicket=ticketId;
  }
  //(modalclose)="closeAssignModal()
  closeModal(status){
    this.assignSuccess=false;
    this.TroubleshootSuccess=false;
    this.isTicketModal=false;
    if(status=='true'){
      this.createSuccess=true;
      this.fetchNewTickets();
    }
    
  }
  closeAssignModal(status){
    this.createSuccess=false;
    this.TroubleshootSuccess=false;
    this.isAssignModal=false;
    if(status=='true'){
      this.assignSuccess=true;
      this.fetchNewTickets();
    }
  }
  closeTroubleshoot(status){
    this.createSuccess=false;
    this.assignSuccess=false;
    this.isTroubleshoot=false;
    if(status==true){
      this.TroubleshootSuccess=true;
    }
  }

  goToTicketstDetailsPage(ticketId,status, severity){
    this.copsService.changeIsAlertSelected(true);
    this.tid = ticketId;
    this.router.navigate(['../ticketdetails/',this.tid,status,this.activeTab,severity],{relativeTo:this.route});
  }
}
