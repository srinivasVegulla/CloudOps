import { Component, OnInit } from '@angular/core';
import { CopsService } from '../service.component';

@Component({
  selector: 'cops-log-insights',
  templateUrl: './log-insights.component.html',
  styleUrls: ['./log-insights.component.scss']
})
export class LogInsightsComponent implements OnInit {

  logInsightData;
  rows = [];
  filterData = [];

  constructor(private copsService:CopsService) { }

  ngOnInit() {
    this.copsService.getLogInsights().subscribe((response)=>{      
      this.logInsightData = response["hits"]["hits"];
      let data = [];
      for(let i=0; i<this.logInsightData.length; i++) {
        data.push(this.logInsightData[i]["_source"]);
      }
      this.rows = data;
      this.filterData = data;
    });
  }

  updateFilter(event, colName, innerColname) {
    let searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      this.rows = this.filterData;
    }
    let temp
    if (innerColname) {
       temp = this.filterData.filter(function(currItem) {
        return currItem[colName][innerColname].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
    } else {
       temp = this.filterData.filter(function(currItem) {
        return currItem[colName].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
    }

    this.rows = temp;
  }


}
