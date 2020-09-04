import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CopsService } from '../service.component';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// * as $ from 'jquery';

@Component({
  selector: 'app-ticket-details-container',
  templateUrl: './ticket-details-container.component.html',
  styleUrls: ['./ticket-details-container.component.scss']
})
export class TicketDetailsContainerComponent implements OnInit {

  constructor(private copsService : CopsService,private router:Router,private route:ActivatedRoute) { }
  
  @Input() ticketId;
  @Input() ticketStatus;
  @Input() tickettab;
  acknowledgedTime;
  currentDate : any=new Date();
  todayString : string = new Date().toDateString();
  customDate : any=new Date("Sun Jun 14 2020 13:30:00 GMT+0530");
  secs:any;
  totalSecs;
  days:any;
  hours:any;
  mins:any;
  seconds:any;
  ticketDetails;
  selectedTicket;
  ticketsData;
  tickets;
  statusid;
  isEdit=false; 
  formUpdate={};
  assignedstatus;
  ticketdescription;
  ticketnotes;
  status=[{"New":"1","In Progress":"2","Closed":"5"}];
  statusidnew;
  ticketUpdateDetails;
  isLoading;
  editError;
  isTroubleshoot;
  TroubleshootSuccess;
  fileData1;
  previewUrl1;
  isAssignModal;
  modifyTicket;
  modifyStatus;
  assignSuccess;
  isSave;
  assigneeid;
  assignees=[{"Balaji muvva":"10","Divya tirumala":"8","Vineetha p":"11","Akhil gudise":"9","Narendar guda":"7","vinod racherla":"5"}];
  fileData;
  bse64url;
  updateError;
  updateSuccess;
  isLogsLoading;
  isnotesLoading;
  troubleshootDetails;
  troubleshoot;

  ngOnInit() {
    this.getSLA();
  //  this.fetchTicketDetails();
  }

  ngOnChanges(changes: SimpleChanges){
    this.isSave = false;
    this.isEdit = false;
    this.fetchTicketDetails(); 
  }
  onEdit(){
    this.ticketdescription = this.ticketDetails.description;
    this.assignedstatus = this.ticketDetails.status;
    this.isEdit = true;
  }
  
  onSubmitNotes(){
    this.isnotesLoading=true;
    for(let as of this.assignees){
      this.assigneeid = as[this.ticketDetails.assignedto];
    }

    let objnotes={"issue_id":this.ticketId,"notes":this.ticketnotes,"assign_id":this.assigneeid};
    this.copsService.sendTicketNotesDetails(objnotes).subscribe(response => {
    if(response == "OK") {
      this.isnotesLoading=false;
      this.editError = false;
      this.isEdit=false;
      this.fetchTicketDetails(); 
      this.ticketnotes="";
  
    } else {
      this.editError = true;
      this.isnotesLoading=false;
      this.ticketnotes="";
    }  
  
  });
  }

  onSave(){
    this.assignSuccess=false;
    this.TroubleshootSuccess=false;
    this.isSave=false;
    this.isLoading=true;
    for(let st3 of this.status){
    
      this.statusidnew=st3[this.assignedstatus];
    }
    if(this.statusidnew=="2"){
      this.acknowledgedTime=this.currentDate;
    }

    let obj3={"issue_id":this.ticketId,"status_id": this.statusidnew,"description":this.ticketdescription,"acknowledged_time":this.acknowledgedTime};
    this.copsService.sendTicketUpdateDetails(obj3).subscribe(response => {
      if(response == "OK") {
        this.isLoading=false;
        this.isSave=true;
        this.editError = false;
        this.isEdit=false;
        this.fetchTicketDetails(); 
    
      } else {
        this.editError = true;
        this.isLoading=false;
      }  
      
    });
  }
  isTroubleshootOpen(){
    if(this.assignedstatus=='Closed'){
      this.openTroubleshoot();
    }
  }
  openTroubleshoot(){
    this.isTroubleshoot=true;
   
  }
  closeTroubleshoot(status){
    this.assignSuccess=false;
      this.isTroubleshoot=false;
      this.isSave=false;
      if(status=="true"){
        this.TroubleshootSuccess=true;
      }
  }
  openTab(th){
    window.open(th,'_blank');
  }
  
  fetchTicketDetails(){
    
    for(let st of this.status){
      this.statusid=st[this.ticketStatus];
    }
    let ticketdet=(this.ticketId).toString();
    let obj={"id":ticketdet,"status": this.statusid};
    
    this.copsService.getTicketDetails(obj).subscribe(response => {
      this.ticketDetails = response;
      //this.preview();
    });
    
    let troubleshootId={"id": +ticketdet};
    this.copsService.getTroubleshootDetails(troubleshootId).subscribe(response => {
      this.troubleshootDetails=response;
      this.troubleshoot=this.troubleshootDetails[0];
      //this.preview();
    });
  }
 
 /* preview() {
    // Show preview 
    let files=this.ticketDetails.logs;
    for(let j=0;j<files.length;j++){

    }
    this.fileData1 = files[0];
    console.log(this.fileData1,"filedata2")
    var mimeType = this.fileData1.type;
   /* if (mimeType.match(/image\/*//*) == null) {
      return;
   } 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData1); 
    reader.onload = (_event) => { 
      this.previewUrl1 = reader.result; 
      console.log(this.previewUrl1,"previewUrl1");
    }
  }*/
  
  goToAlertsPage() {
    this.copsService.changeIsAlertSelected(false);
    this.router.navigate(['../../../../../tickets'],{relativeTo:this.route});
  }

 /* fetchTicket(){
    for(let i=0; i< this.tickets.length; i++) {
      if(this.tickets.ticketid==this.ticketId){
        this.selectedTicket=this.tickets[i];
        console.log(this.selectedTicket,'selectedTicket');
      }
    } 
  }*/

  getSLA(){
    this.totalSecs=Math.abs(this.currentDate - this.customDate)/1000;
    this.days=Math.floor(this.totalSecs/86400);
    this.hours=Math.floor(this.totalSecs/3600)%24;
    this.mins=Math.floor(this.totalSecs/60)%60;
    this.seconds=Math.floor(this.totalSecs)%60;
    // console.log("secs days hours mins seconds",this.sec,this.days, this.hours, this.mins, this.seconds)
  }
  openAssignModal(){
   // console.log("status1",status1,Assignedto);//In Progress Divya tirumala
    this.isAssignModal=true;
    setTimeout(() => {
    
      this.isAssignModal=true;
      $('.selectpicker').selectpicker('refresh');
     
      }, 1500);
  //  this.isAssignModal=true;
    $('.selectpicker').selectpicker('refresh');
    //console.log(this.isAssignModal,"isassignmodal");
    this.modifyTicket=this.ticketId;
   // this.modifyAssignee=this.ticketStatus;
    this.modifyStatus=this.ticketStatus;

  }
  closeAssignModal(status){
    this.isSave=false;
    this.TroubleshootSuccess=false;
    this.isAssignModal=false;
    //console.log(status,"assignstatus");
    if(status=='true'){
      this.assignSuccess=true;
      this.fetchTicketDetails(); 
    }
  }

  onFileSelect(event): void {
   // console.log("inside onFileSelect");
    this.fileData=<File> event.target.files[0]; //file object
     //console.log(this.fileData,'selectfile');
    var reader = new FileReader();
     reader.readAsDataURL(this.fileData);
     reader.onload = (_event) => { 
      this.bse64url=(<string>reader.result).split(',')[1];
     // console.log(this.bse64url,"bse64url");
    }
  }
  onSubmitLogs(){
    this.isLogsLoading=true;
    let obj={"issue_id":this.ticketId,"logs":this.bse64url,"file_name":this.fileData.name,"file_type":this.fileData.type};
   this.copsService.updateLogs(obj).subscribe( (response: any) => {
     if(response == "OK") {
      this.isLogsLoading=false;
      this.updateSuccess=true;
      this.fetchTicketDetails(); 
      $('.fileDiv input[type=file]').val('');
   
    } else {
      this.updateError = true;
      this.isLogsLoading=false;
    }  
    });
 
  }
}
