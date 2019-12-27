import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CopsService } from '../service.component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst";


@Component({
  selector: 'cops-service-health',
  templateUrl: './service-health.component.html',
  styleUrls: ['./service-health.component.scss']
})
export class ServiceHealthComponent implements OnInit, AfterViewInit, OnDestroy {

  serviceHealth;
  resourcesList = [];   //main Parents available
  customHealthService = [];   //Object created for process the data for charts
  sunBurstObjData = [];  // data to be given for chart as input
  charts;

  constructor(private copsService:CopsService,) { }

  ngOnInit() {
    this.copsService.serviceHealthCheck().subscribe((response)=>{      
      this.serviceHealth = response;
     this.processServiceHealth(response);
    });
  }

  processServiceHealth(response) {
    this.resourcesList = [];
    this.customHealthService = [];
    for(let i=0; i<response.length; i++) {
      if(this.resourcesList.length > 0) {
        if(this.resourcesList.indexOf(response[i]["resource_name"]) > -1){

        }else {
          this.resourcesList.push(response[i]["resource_name"]);
        }
      } else {
        this.resourcesList.push(response[i]["resource_name"]);
      }
    }

    for(let i=0; i<this.resourcesList.length; i++) {
       let obj = {};
       var val = this.resourcesList[i];
       obj[val] = response.filter(function(currentItem){
         return (currentItem["resource_name"] == val);
       });
       this.customHealthService.push(obj);
    }
    this.constructSunBurstChartObj(this.customHealthService);
  }

  constructSunBurstChartObj(obj) {
    this.sunBurstObjData = [];
    for(let i=0; i<obj.length; i++) {
      let subBurstObj = {};
      subBurstObj["name"] = Object.keys(obj[i]).toString();
      let arr = [];
      arr = Object.values(obj[i]);
      arr[0].forEach((element) => {
        element['name']= element["service"];
        element["value"]= 1;
        element["parent"] = subBurstObj["name"];
        if(element["status"] == 'CRITICAL'){
          element["color"]= '#f94667';
        }
      });
      subBurstObj["children"] = arr[0];
      this.sunBurstObjData.push(subBurstObj);
    }

    //Build the Chart
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    let chart = am4core.create("chartdivz", am4plugins.Sunburst);
    chart.padding(0,0,0,0);
    chart.radius = am4core.percent(98);

    chart.data = this.sunBurstObjData;
      

    chart.colors.step = 2;
    chart.fontSize = 16;
    chart.innerRadius = am4core.percent(20);

    // define data fields
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.dataFields.color = "color";


    let level0SeriesTemplate = new am4plugins.SunburstSeries();
    level0SeriesTemplate.hiddenInLegend = false;
    chart.seriesTemplates.setKey("0", level0SeriesTemplate);



    // this makes labels to be hidden if they don't fit
    level0SeriesTemplate.labels.template.truncate = true;
    level0SeriesTemplate.labels.template.hideOversized = true;
    level0SeriesTemplate.labels.template.text = "{category}";
    level0SeriesTemplate.labels.template.text.fontsize(18);
    level0SeriesTemplate.slices.template.tooltipText = "{category}";
    level0SeriesTemplate.slices.template.events.on("hit", handleChartClick, this);

    level0SeriesTemplate.labels.template.adapter.add("rotation", function(rotation, target) {
      target.maxWidth = target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
      target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);

      return rotation;
    })


    let level1SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey("1", level1SeriesTemplate)
    //level1SeriesTemplate.fillOpacity = 0.75;
    level1SeriesTemplate.hiddenInLegend = true;
    level1SeriesTemplate.slices.template.tooltipText = "{category}";

    function handleChartClick(ev) {
          let selectedObj =  ev.target.dataItem.dataContext._dataContext;
          let searchKey = (Object.keys(selectedObj).indexOf("parent") > -1) ? "parent" : "name";
          let data = this.sunBurstObjData.find(function(currentItem) {
            return (currentItem["name"] == selectedObj[searchKey]);
          });
          this.toogleData = !this.toogleData;
          chart.data = (this.toogleData) ? [data] : this.sunBurstObjData;
    }

    level1SeriesTemplate.slices.template.events.disable();

    let level2SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey("2", level2SeriesTemplate)
    level2SeriesTemplate.fillOpacity = 0.75;
    level2SeriesTemplate.hiddenInLegend = true;

    //chart.legend = new am4charts.Legend();

    this.charts = chart;

  }

  ngOnDestroy() {
    for(let i=0; i< this.charts.length; i++) {
      this.charts[i].dispose();
    }
  }
}
