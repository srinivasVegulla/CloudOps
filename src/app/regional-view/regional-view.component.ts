import { Component, OnInit, OnDestroy } from '@angular/core';
import { CopsService } from '../service.component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import europeMap from "@amcharts/amcharts4-geodata/region/world/europeHigh";
import asiaMap from "@amcharts/amcharts4-geodata/region/world/asiaHigh";
import * as $ from 'jquery';

@Component({
  selector: 'cops-regional-view',
  templateUrl: './regional-view.component.html',
  styleUrls: ['./regional-view.component.scss']
})
export class RegionalViewComponent implements OnInit, OnDestroy{

  regionalViewData;
  displayRows;
  mapsChart;
  expandDropDown = false;
  dropDwnValue;
  regions = ['North America', 'Europe', 'Asia'];
  selectedRegion = 'North America';
  regionMapsMapping = {
    "North America": "am4geodata_usaLow",
    "Eurrope": "europeMap",
    "Asia": "asiaMap"
  }
  columns = ['region', 'clusters', 'users', "services", 'vms']
  displayColumns = [
    {"displayName": "Region", "width": "40", "key": "region"},
    {"displayName": "Clusters", "width": "15" , "key": "clusters"},
    {"displayName": "Users", "width": "15", "key": "users"},
    {"displayName": "Services", "width": "15", "key": "services"},
    {"displayName": "VMS", "width": "15", "key": "vms"},
  ]

  constructor(private copsService:CopsService) { }

  ngOnInit() {
    this.copsService.getRegionalViewsData().subscribe((response) => {
      this.regionalViewData = response;
      // this.displayRows = this.regionalViewData.splice(0,5);
      this.prepareTableData(this.selectedRegion);
    });

    this.drawChart(this.selectedRegion);

  }

  setSlectedRegion(event){
    this.selectedRegion = event.target.value;
    this.drawChart(this.selectedRegion);
    this.prepareTableData(this.selectedRegion);
  }


  drawChart(region) {
    // Create map instance
    var chart = am4core.create("mapsChart", am4maps.MapChart);


    // Set projection
    if(region == 'North America') {
      chart.geodata = am4geodata_usaLow;
      chart.projection = new am4maps.projections.AlbersUsa();
    }else if(region == 'Europe') {
      chart.geodata = europeMap;
      
      chart.projection = new am4maps.projections.NaturalEarth1();
    }else if(region == 'Asia') {
      chart.geodata = asiaMap;
      chart.projection = new am4maps.projections.NaturalEarth1();
    }
    
   //chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
   // polygonTemplate.fill = am4core.color("#f4f8f9");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    this.mapsChart = chart;
    this.hideAmchartsIcon();
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

  openDropdown() {
    this.expandDropDown = !this.expandDropDown;
  }
  prepareTableData(region) {
    console.log("hi regional", this.regionalViewData)
    let selectedRegionTableData = this.regionalViewData.filter(obj => {
      return (obj['continent'] == region);
    });
    this.displayRows = selectedRegionTableData;
  }

  changeRegion(regionName) {
    this.expandDropDown = !this.expandDropDown;
    this.dropDwnValue = regionName;
  }

  getValue(row, column) {
    let key = column['key'];
    return row[key];
  }


  ngOnDestroy() {
    if (this.mapsChart) {
      this.mapsChart.dispose();
    }
  }

}
