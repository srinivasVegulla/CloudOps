import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CopsService } from '../service.component';
import { UtilityService } from '../utility.service';

import {  NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { NgxChartsModule } from '@swimlane/ngx-charts';


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'cops-utilization-details',
  templateUrl: './utilization-details.component.html',
  styleUrls: ['./utilization-details.component.scss']
})
export class UtilizationDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  view: any[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country c';
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'Population';

  colorScheme = {
    domain: ['red', 'blue', 'green', 'pink']
  };

  
  utilResponse;
  tenants = [];
  
  finalizedTenants = [];
  activeTab:string = 'costUtil';
  chart;
  showingFinalTentants = [];/* [{tenantName: "cloudforms", tenant_cost: 134.88, utilized_tenant_cost: 54.2, percentage: "40.18"},
   {tenantName: "admin", tenant_cost: 782.4, utilized_tenant_cost: 225.84999999999997, percentage: "28.87"},
   {tenantName: "demo", tenant_cost: 440.1599999999999, utilized_tenant_cost: 152.44000000000003, percentage: "34.63"}]; */


   showGraphCus;
   showGraphCusVms;
   showGraphCusVmsColors;
  constructor(private copsService:CopsService, private utilityService: UtilityService, private zone: NgZone) {
  }

  ngOnInit() {
    this.copsService.getTenantDetailsByCost().subscribe((response)=>{      
      this.utilResponse = response;
     this.processTenants(response);
    });
  }

  setActiveTab(tabValue) {
    this.activeTab = tabValue;
    if(tabValue == 'costUtil') {
      this.showingFinalTentants = this.finalizedTenants.slice(1,4);
    } else if(tabValue == 'cpuUtil') {
      this.showingFinalTentants = this.finalizedTenants.slice(3,5);
    }
    
  }

  processTenants(res) {
    if(res.length > 0) {
      this.tenants = Object.keys(res[0].tenants);
    }
    
   
    for(let i=0; i< this.tenants.length; i++) {
      let tenantObj = {};
      tenantObj["tenantName"] = this.tenants[i];
      let tenant_cost = this.processcost(res, this.tenants[i], 'tenant_cost');
      let utilized_tenant_cost = this.processcost(res, this.tenants[i], "utilized_tenant_cost");
      if(tenant_cost > 0 || utilized_tenant_cost > 0) {
        let percentage = (utilized_tenant_cost * 100)/tenant_cost;
        tenantObj["tenant_cost"] = tenant_cost;
        tenantObj["utilized_tenant_cost"] = utilized_tenant_cost;
        tenantObj["percentage"] = Math.round(percentage);
        this.finalizedTenants.push(tenantObj);
      }
    }

    if (this.finalizedTenants.length > 3) {
      this.showingFinalTentants = this.finalizedTenants.slice(0,3);
    } else {
      this.showingFinalTentants = this.finalizedTenants;
    }

    this.processBarGraph(res);
  }

  processBarGraph(res) {
    this.showGraphCusVms = [];
    this.showGraphCusVmsColors = [];
    for(let i=0; i< this.tenants.length; i++) {
      var vms = res[0]["tenants"][this.tenants[i]]["vms"];
      var indVm = Object.keys(vms);
     if(indVm.length > 0 ) {
      var indObj = [];
      var indObjcolor = [];
      for(let j=0; j< indVm.length; j++) {
        let obj = {};
        let objColor = {};
        objColor["name"] = obj["name"] = res[0]["tenants"][this.tenants[i]]["vms"][indVm[j]]["vm_name"];
        let percentage = (res[0]["tenants"][this.tenants[i]]["vms"][indVm[j]]["utilized_vm_cost"]*100)/res[0]["tenants"][this.tenants[i]]["vms"][indVm[j]]["total_vm_cost"];
        obj["value"] = Math.round(percentage);
        if(obj["value"] <= 20) {
          objColor["value"] = "#769f3b";
        } else {
          objColor["value"] = "#f94667";
        }
        indObj.push(obj);
        indObjcolor.push(objColor)
      }
      this.showGraphCusVms.push(indObj);
      this.showGraphCusVmsColors.push(indObjcolor)
     }
     
    }
  }

  processcost(response, tenantName, costParam) {
    let result =  response.reduce(function(total, currentValue, currentIndex, arr) {
      if(currentValue["tenants"]){
        if(currentValue["tenants"][tenantName]){
            return total + currentValue["tenants"][tenantName][costParam];
        } else {
          return total;
        }
      } else {
        return total;
      }
     }, 0);
     return result;
  }


  ngAfterViewInit() {

  }
  
    

    

  

  ngOnDestroy() {
  
  }

}
