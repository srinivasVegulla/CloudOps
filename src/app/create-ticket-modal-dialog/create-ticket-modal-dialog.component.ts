import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopsService } from '../service.component';

@Component({
  selector: 'app-create-ticket-modal-dialog',
  templateUrl: './create-ticket-modal-dialog.component.html',
  styleUrls: ['./create-ticket-modal-dialog.component.scss']
})
export class CreateTicketModalDialogComponent implements OnInit {
  
  constructor( private fb: FormBuilder,private copsService:CopsService,private cd: ChangeDetectorRef) { }
  CreateForm: FormGroup;
  @Output() modalclose = new EventEmitter();
  formError;
  @Input() ticketId;
  bse64url;
  isLoading;
  fileInfo: string;
  severities=["Minor","Major","Critical"];
 // priorities=[{"Low":"1","Normal":"2","High":"3","Urgent":"4","Immediate":"5"}];
  priorities=[{"Minor":"1","Major":"2","Critical":"3"}];
  priorityid;
  filesselected;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectfile;
  stringfile;
  byteArray;
  arrayBuffer;
  
  ngOnInit() {
    this.CreateForm = this.fb.group({
      tickettitle: ['', Validators.required],
      severity: ['null', Validators.required],
      assignedgroup: ['', Validators.required],
      logs: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  onCancel(){
    this.modalclose.emit("false");
  }

  onFileSelect(event): void {
    console.log("inside onFileSelect");
    this.fileData=<File> event.target.files[0]; //file object
     console.log(this.fileData,'selectfile');
   
    var reader = new FileReader();
     reader.readAsDataURL(this.fileData);
     reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
      this.bse64url=(<string>reader.result).split(',')[1];
      console.log(this.bse64url,"bse64url");    
      
    }
    
  }
  onSubmit(createformdata){
    console.log(createformdata,"createformdatacvd");
    this.isLoading=true;

    let data=this.CreateForm.value;
    for(let priority of this.priorities){
      this.priorityid=priority[data.severity];
    }
 
    /*let obj={"project_id":3,"ticket_title":data.tickettitle,"severity":+this.priorityid,"Description":data.description,"files":{"filename":this.fileData.name,"filetype":this.fileData.type,"file":this.previewUrl}};*/
    let obj={"project_id":3,"ticket_title":data.tickettitle,"severity":+this.priorityid,"Description":data.description,"logs":this.bse64url,"file_name":this.fileData.name,"file_type":this.fileData.type};
    console.log(obj,"objectt_createticket");
  
    this.copsService.uploadFile(obj).subscribe( (response: any) => {
      console.log("uploadFile_createticket",response);
      if(response == "OK") {
        this.isLoading=false;
        this.formError = false;
        this.modalclose.emit("true");
      } else {
        this.formError = true;
        this.isLoading=false;
      }       
    }, (error) => {

    });
  }

  openTab(th){
    console.log(th,"dnfdf");
    window.open(th,'_blank');
  }
}
