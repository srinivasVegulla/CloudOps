import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class CopsService {

  backendURL =  'http://10.138.77.193:12355/';
  constructor(
   private http:HttpClient
  ) { }
  public isAlertSelected = new BehaviorSubject<boolean>(false);
  public alertObject = new BehaviorSubject<Object>({});
  public isSideNavOpen = new BehaviorSubject<boolean>(false);

  changeIsAlertSelected(value) {
    this.isAlertSelected.next(value);
  }

  changeAlertObject(obj) {
    this.alertObject.next(obj);
  }

  changeIsSideNavOpen(value){
    this.isSideNavOpen.next(value);
  }

  login(loginData) {

    return this.http.post( this.backendURL +'ldapauth', loginData)
        .pipe(map((res) => {
        return res;
        }));
  }

  getClusters() {
    //console.log(" ----- START ------");
    //console.log(this.httpClient.get('http://10.138.77.176:11111/vnf_data'));
    //console.log("------- END --------");
    return this.http.get('http://10.138.77.193:11111/vnf_data');
  }

  getTenantDetailsByCost() {
    //console.log(" ************ START **********");
    //console.log(this.http.get('http://10.138.77.176:11111/cluster_CB'));
   //console.log(" ****** END *********");
    return this.http.get('http://10.138.77.193:11111/cluster_CB');
  }

  getTodaysDetailsByCost() {
    //console.log(" ************ START **********");
    //console.log(this.http.get('http://10.138.77.176:11111/cluster_day'));
   //console.log(" ****** END *********");
    return this.http.get('http://10.138.77.193:11111/cluster_td');
  }


  getAlarms(){
    return this.http.get('http://10.138.77.193:11111/alarm-list');
  }

  getMinorAlarms(){
    return this.http.get('http://10.138.77.193:11111/ceilometer-alarm-list');
  }

  getLogInsights() {
    return this.http.get( this.backendURL +'loginsights');
  }

  //AutoRemediation
  serviceHealthCheck() {
    return this.http.get('http://10.138.77.193:11111/nagiosservices');
  }
  

  getAlarmsCount() {
    return this.http.get('http://10.138.77.193:11111/alarmcount');
  }

  getTicketHistory() {
    return this.http.get('http://10.138.77.193:11111/alarm-list');
  }

  getAlertsTableData() {
    return this.http.get('http://10.138.77.193:11111/security');
  }
  
  getTicketDetails(ticketobj){
    return this.http.post( this.backendURL +'ticketdetails', ticketobj)
    .pipe(map((res) => {
    return res;
    }));
  }

  getTroubleshootDetails(ticketobj){
    return this.http.post( this.backendURL +'timeentrydetails', ticketobj)
    .pipe(map((res) => {
    return res;
    }));
  }
  updateLogs(obj){
    return this.http.post( this.backendURL +'logsupdate', obj)
    .pipe(map((res) => {
    return res;
    }));
  }
  uploadFile(obj){
    return this.http.post( this.backendURL +'createissue', obj)
    .pipe(map((res) => {
    return res;
    }));
  }
  
 
    /*
  sendTicketDetails(object,file){
    let formData = new FormData();
    formData.append("project_id",object.project_id);
    formData.append("ticket_title",object.ticket_title);
    formData.append("severity",object.severity);
    formData.append("Description",object.Description);
    console.log("formdata",formData,"fedf",object.project_id);
   // formData.append("logs", object.logs);
   // console.log("formdata",formData.get("logs"));
    //console.log("formdata",formData.keys();
    return this.http.post<any>( this.backendURL +'createissue', formData 
    ,{
      // NOTE: Because we are posting a Blob (File is a specialized Blob
      // object) as the POST body, we have to include the Content-Type
      // header. If we don't, the server will try to parse the body as
      // plain text.
      headers: {
        "Content-Type": file.type
     },
      params: {
        clientFilename: file.name,
        mimeType: file.type
      }
    }
  )
    .pipe(map((res) => {
    return res;
    }));
  }*/
 
	// I upload the given file to the remote server. Returns a Promise.
/*	uploadFile( file: File ) {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log("formdata",formData.getAll);
		this.http.post(
				 this.backendURL +"createissue",
				formData ,{
          reportProgress: true,
          responseType: 'json'
        }// Send the File Blob as the POST body.
			
			)
			.pipe(map((res) => {
        return res;
        }));
  }*/
 
  sendAssigneeDetails(formdata){
    return this.http.post( this.backendURL +'assignissue', formdata)
    .pipe(map((res) => {
    return res;
    }));
  }
  sendtroubleshoot(formdata){
    return this.http.post( this.backendURL +'createtroubleshoot', formdata)
    .pipe(map((res) => {
    return res;
    }));
  }
  getTickets(){
    return this.http.get( this.backendURL +'tickets');
  }
  getTicketsHistory(){
    return this.http.get( this.backendURL +'history');
  }
  getSeverityIssues(){
    return this.http.get( this.backendURL +'severityissues');
  }
  sendTicketUpdateDetails(editData){
    return this.http.post( this.backendURL +'statusupdate', editData)
    .pipe(map((res) => {
    return res;
    }));
  }
  sendTicketNotesDetails(notesData){
    return this.http.post( this.backendURL +'notesupdate', notesData)
    .pipe(map((res) => {
    return res;
    }));
  }
  
  getVmInfo(){
    return this.http.get( this.backendURL +'vminfo');
  }

  getHostStatus(){
    return this.http.get( this.backendURL +'hoststatus');
  }

  getAlaramsData(){
    return this.http.get( this.backendURL +'tickets');
  }

  getPeriodicActivitiesData(){
    return this.http.get( this.backendURL +'periodicactivities');
  }

  getRegionalViewsData(){
    return this.http.get( this.backendURL +'regionalviews');
  }
  getSecurityVulnurablitiesData() {
    return this.http.get( this.backendURL +'securityvulnerabilities');
  }

  getAutoRemediationData() {
    return this.http.get( this.backendURL +'autoremediation');
  }

  getAutoRemediationLogsData() {
    return this.http.get( this.backendURL +'autoremediationlogs');
  }

  getAppInsights(){
    return this.http.get( this.backendURL +'vminfo');
  }

  getBillingData(data) {
    return this.http.post( this.backendURL +'vmbilling', data).pipe(map((res) => {
      return res;
      }));
  }
  getTenantsList() {
    return this.http.get( this.backendURL +'tenantlist');
  }

  getTenantsDetails(){
    return this.http.get( this.backendURL +'tenantsdetails');
  }

  getStartEndDates() {
    return this.http.get( this.backendURL +'dates');
  }

  getDataforStartEndDays(data) {
    return this.http.post( this.backendURL +'cluster_days', data).pipe(map((res) => {
      return res;
      }));
  }

  getRCAdetails(data) {
    return this.http.post( this.backendURL +'rcashow', data).pipe(map((res) => {
      return res;
      }));
  }

  hideAmchartsIcon() {
    setTimeout(() => {
        let list = $("rect");
        list.map((item) => {
            let it = $(list[item]);
            if (it.attr("width") == '66' && it.attr("height") == '21') {
                it.parent().parent().remove();
            }
        });
    }, 1000);
}

}
