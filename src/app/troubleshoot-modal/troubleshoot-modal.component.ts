import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CopsService } from '../service.component';

@Component({
  selector: 'app-troubleshoot-modal',
  templateUrl: './troubleshoot-modal.component.html',
  styleUrls: ['./troubleshoot-modal.component.scss']
})
export class TroubleshootModalComponent implements OnInit {

  @Input() ticketId;
  troubleShootForm: FormGroup;
  formError;
  //isLoading=false;
 
  @Output() troubleshootclose = new EventEmitter();
  constructor( private fb: FormBuilder,private copsService:CopsService) { }

  ngOnInit() {
    this.troubleShootForm = this.fb.group({
     // signature: ['', Validators.required],
      fixdescription: ['', Validators.required]
    });
   
  }
  
  onSubmit(troform){
  //post request with   @Input() ticketId;
  let obj={"Fix_description":troform.fixdescription,"hours":"4","activity_id":9,"issue_id":this.ticketId,"resource_id":"162"};
  console.log(obj,"obj_sendtroubleshoot");
  this.copsService.sendtroubleshoot(obj).subscribe( 
  (response: any) => {
    console.log(response,"sendtroubleshoot");
    if(response == "OK") {
      //this.isLoading=false;
      this.formError = false;
      this.troubleshootclose.emit("true");
   
    } else {
      //this.isLoading=false;
      this.formError = true;
    }       
  }, (error) => {

  });
  }

  onCancel(){
    this.troubleshootclose.emit(true);
  }
}
