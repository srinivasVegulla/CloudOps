import { Component, OnInit, OnDestroy } from '@angular/core';
import { generate } from 'rxjs';
import { CopsService } from '../service.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-auto-remediation',
  templateUrl: './auto-remediation.component.html',
  styleUrls: ['./auto-remediation.component.scss']
})
export class AutoRemediationComponent implements OnInit, OnDestroy {


  chartAutoRemidiation;
  chartRepeatedIncident;
  chartNewIncident;
  autoRemediationData;
  arData;
  repeatedIncident;
  newIncident;
  arDataPercent;
  repeatedIncidentPercent;
  newIncidentPercent;
  selectedObject;

  constructor(private copsService: CopsService) { }

  ngOnInit() {
    this.copsService.getAutoRemediationData().subscribe((response)=>{      
      this.autoRemediationData = response;
      this.prepareDataObjects(this.autoRemediationData[0]);
      this.generateChart('chartAutoRemidiation', this.arData, this.arDataPercent);
    this.generateChart('chartRepeatedIncident', this.repeatedIncident, this.repeatedIncidentPercent);
    this.generateChart('chartNewIncident', this.newIncident, this.newIncidentPercent);
    });
    
  }
  prepareDataObjects(obj){
    this.selectedObject = obj;
    this.arData = [{
      "name": "Auto Remidiated",
      "status": obj['autoremediated'],
      "color": "green"
    }, {
      "name": "",
      "status": obj['total']-obj['autoremediated'],
      "color": "grey"
    }];
    
    this.repeatedIncident = [{
      "name": "Repeated Incident",
      "status": obj['repeatedincidents'],
      "color": "blue"
    }, {
      "name": "",
      "status": obj['total']-obj['repeatedincidents'],
      "color": "grey"
    }];
    this.newIncident = [{
      "name": "New Incident",
      "status": obj['newincidents'],
      "color": "violent"
    }, {
      "name": "",
      "status": obj['total']-obj['newincidents'],
      "color": "grey"
    }];

    this.arDataPercent = obj['autoremediated']/obj['total'] * 100;
    this.repeatedIncidentPercent = obj['repeatedincidents']/obj['total']* 100;
    this.newIncidentPercent = obj['newincidents']/obj['total'] * 100;
  }

  generateChart(chartName, chartData, percent) {
    //am4core.useTheme(am4themes_animated);
    var chart = am4core.create(chartName, am4charts.PieChart);

    // Add data
    chart.data = chartData;

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "status";
    pieSeries.dataFields.category = "name";
    pieSeries.innerRadius = am4core.percent(80);

    pieSeries.labels.template.disabled = true;

    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.slices.template.tooltipText = "{category}: {value.value} ";

    pieSeries.ticks.template.disabled = true;
    /* pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.radius = am4core.percent(-80);
    pieSeries.labels.template.fill = am4core.color("red"); */

    var container = new am4core.Container();
    container.parent = pieSeries;
    container.horizontalCenter = "middle";
    container.verticalCenter = "middle";
    container.width = am4core.percent(80);
    container.fill = am4core.color("#ffffff");

    var label = new am4core.Label();
    label.parent = container;
    label.text = percent + '%';
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 20;
    this.copsService.hideAmchartsIcon();

    if(chartName = 'chartAutoRemidiation') {
      this.chartAutoRemidiation = chart;
    } else if(chartName = 'chartRepeatedIncident') {
      this.chartRepeatedIncident = chart;
    } else if(chartName = 'chartNewIncident') {
      this.chartNewIncident = chart;
    }
  }

  ngOnDestroy(){
    if (this.chartAutoRemidiation) {
      this.chartAutoRemidiation.dispose();
    }
    if (this.chartRepeatedIncident) {
      this.chartRepeatedIncident.dispose();
    }
    if (this.chartNewIncident) {
      this.chartNewIncident.dispose();
    }
  }
}
