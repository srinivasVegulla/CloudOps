import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopsService } from '../service.component';
declare var $:any;
//import * as $ from 'jquery';

@Component({
  selector: 'app-assign-ticket-modal',
  templateUrl: './assign-ticket-modal.component.html',
  styleUrls: ['./assign-ticket-modal.component.scss']
})
export class AssignTicketModalComponent implements OnInit {

  AssignForm: FormGroup;
  @Output() assignclose = new EventEmitter();
  constructor( private fb: FormBuilder,private copsService:CopsService) { }
  responseData1=[{"assignee":"Divya"},{"assignee":"Vineetha"}];
  //responseData=["balaji","divya","vineetha","akhil","narendar","vinod"];
  responseData=["Balaji muvva","Divya tirumala","Vineetha p","Akhil gudise","Narendar guda","vinod racherla"];
  assigneerows;
  AssignError;
  @Input() ticketId;
  @Input() assignee;
  @Input() statusas;
  statusid;
  assigneeid;
  project_id=3;
 
  //assignees=[{"balaji":"10","divya":"8","vineetha":"11","akhil":"9","narendar":"7","vinod":"5"}];
  assignees=[{"Balaji muvva":"10","Divya tirumala":"8","Vineetha p":"11","Akhil gudise":"9","Narendar guda":"7","vinod racherla":"5"}];
  assigneename;
  isLoading;
 
  ngOnInit() {
   /* this.AssignForm = this.fb.group({
      assigneename: ['', Validators.required]
    });*/
    this.assigneerows=this.responseData;
    $('.select').selectpicker('refresh');
    setTimeout(() => {
      //this.isselectLoading=false;
      $('.selectpicker').selectpicker('refresh');
      }, 50);
  }
 
  
 /* changeassignee(e){
   // console.log("kjjhrkejllgmlfgml",this.assigneename);
    //console.log("ffff",e.target.value)
    this.AssignForm.get('assigneename').setValue(e.target.value,{onlyself:true});
    console.log("sssssss",this.AssignForm.get('assigneename'));
  }*/
  
  onCancel(){
    this.assignclose.emit(false);
  }
  onAssign(){ 
    this.isLoading=true;
    let setvalue=$('#selectpicker').val();
    //console.log(setvalue,"xcjxch");
    //console.log($('#assigneename option:selected').text());
    for(let as of this.assignees){
      this.assigneeid=as[setvalue];
    }
   let  status=[{"New":1,"In Progress":2}];
   // console.log('assignformdata', formdata.value);
    for(let st of status){
      this.statusid=st[this.statusas];
    }
    //let obj={"issue_id":this.ticketId,"assign_id":this.assigneeid,"status_id":this.statusid};
    let obj={"issue_id":this.ticketId,"assign_id":this.assigneeid};
    console.log('obj_assignformdata', obj);
    this.copsService.sendAssigneeDetails(obj).subscribe(
      (response: any) => {
        console.log(response,"sendAssigneeDetails");
        if(response == "OK") {
          this.isLoading=false;
          this.AssignError = false;
          this.assignclose.emit("true");
       
        } else {
          this.isLoading=false;
          this.AssignError = true;
        }       
      }, (error) => {

      });
    
  }
  updateFilter(event, colName) {
    //console.log("updateifilter",event,colName);
    let searchValue = event.target.value.toLowerCase();
   // console.log(searchValue);
    if (!searchValue) {
     this.assigneerows = this.responseData;
    }
    let temp;
     // console.log("temp");
       temp = this.responseData.filter(function(currItem) {
         //console.log("curritem",currItem);
        return currItem.toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
      this.assigneerows = temp;
}
ngAfterViewInit(){
  $('.selectpicker').trigger('change');
  $(".selectpicker").on("changed.bs.select", 
    function(e, clickedIndex, newValue, oldValue) {
      //console.log(this.value, clickedIndex, newValue, oldValue,"select")
    });
}
}
