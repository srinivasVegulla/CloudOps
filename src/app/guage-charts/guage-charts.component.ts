import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import {  NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
//import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'cops-guage-charts',
  templateUrl: './guage-charts.component.html',
  styleUrls: ['./guage-charts.component.scss']
})
export class GuageChartsComponent implements OnInit , AfterViewInit, OnDestroy {

  charts = [];
  private showingFinalTentants = [];
  //@Input() showingFinalTentants;
  @Input() set _showingFinalTentants(value) {
    this.showingFinalTentants = value;
    if(this.charts.length > 0) {
      this.ngOnDestroy();
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 100)
    }
}
  constructor(private zone: NgZone) { }
  

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => { 
      for(let i=0; i < this.showingFinalTentants.length; i++) {
        this.createChart('chartDiv'+i, this.showingFinalTentants[i]);
      }
    });
  }

  createChart(chartId, dataObj) {
    let chart = am4core.create(chartId, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    chart.fill = am4core.color("#d8d8d8");
    chart.fillOpacity = 1;

    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;

    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.fill = am4core.color("#d8d8d8");
    axis.renderer.line.strokeOpacity = 0;
    axis.renderer.labels.template.radius = -40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "";
    })

    axis.renderer.minGridDistance = 200;

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 80;
    range0.axisFill.fillOpacity = 1;
   // range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.fill =  am4core.color("#769f3b");

    let range1 = axis2.axisRanges.create();
    range1.value = 80;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#f94667");

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(5);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = dataObj.percentage;
    hand.fill = am4core.color("#ffffff");
    hand.stroke = am4core.color("#ffffff");

    this.charts.push(chart);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      for(let i=0; i< this.charts.length; i++) {
        this.charts[i].dispose();
      }
    });
  }
}
