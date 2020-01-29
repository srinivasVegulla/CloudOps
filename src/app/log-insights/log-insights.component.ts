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
  totalRecords = [];
  rowsPerPage = 10;
  recperpage = [5,10,15,20];
  totalPages;
  currentPage = 1;

  constructor(private copsService:CopsService) { }

  ngOnInit() {
    this.copsService.getLogInsights().subscribe((response)=>{      
      this.logInsightData = response["hits"]["hits"];
      let data = [];
      for(let i=0; i<this.logInsightData.length; i++) {
        data.push(this.logInsightData[i]["_source"]);
      }
      this.totalRecords = data;
      this.calculatePages();
    });
  }

  updateFilter(event, colName, innerColname) {
    let searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      this.rows = this.totalRecords;
    }
    let temp
    if (innerColname) {
       temp = this.totalRecords.filter(function(currItem) {
        return currItem[colName][innerColname].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
    } else {
       temp = this.totalRecords.filter(function(currItem) {
        return currItem[colName].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      });
    }

    this.rows = temp;
  }
  calculatePages() {
    this.totalPages = ((this.totalRecords.length % this.rowsPerPage) == 0) ? (this.totalRecords.length / this.rowsPerPage): Math.ceil(this.totalRecords.length /this.rowsPerPage);
    this.paginate();
  }
  

  updateRecPerPage(page) {
    this.rowsPerPage = page;
    this.currentPage = 1;
    this.calculatePages();
  }

  paginate() {
    this.rows = this.totalRecords.slice(((this.currentPage-1)*this.rowsPerPage), ((this.currentPage)*this.rowsPerPage));
  }

  previous() {
    this.currentPage -= 1;
    this.paginate();
  }
  next() {
    this.currentPage += 1;
    this.paginate();
  }

}
