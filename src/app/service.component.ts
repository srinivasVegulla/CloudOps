import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CopsService {

  constructor(
   private http:HttpClient
  ) { }

  login(loginData) {

    return this.http.post('http://10.138.77.193:11111/ldapauth', loginData)
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
    return this.http.get('http://10.138.77.193:11111/loginsights');
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
 
}
