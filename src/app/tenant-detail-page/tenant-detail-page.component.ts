import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CopsService } from '../service.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
declare var $;

@Component({
  selector: 'cops-tenant-detail-page',
  templateUrl: './tenant-detail-page.component.html',
  styleUrls: ['./tenant-detail-page.component.scss']
})
export class TenantDetailPageComponent implements OnInit {

  @Input() tenant;
  @Output() closeDetailPage =  new EventEmitter<string>();
  rows = [];
  responseData = [];
  rowsPerPage = 10;
  recperpage = [5, 10, 15, 20];
  totalPages;
  currentPage = 1;
  filteredData = [];
  searchObj = [];
  isSideNavOpenSubscription;
  widgetDateHeading;
  selectedTenantName = '';
  graphData = [];
  showDataOngraph = [];
  showNextDataOnGraph = false;
  currentGraphPage = 1;
  totalGraphPages;
  graphsPerPage = 31;
  recperGraphpage = [10, 15, 20, 25, 30, 31];
 
  monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  startdate;
  endDate;

  calMinDate:any;
   calMaxDate:any;

   
   currentDate = new Date(); 

  constructor(private copsService: CopsService,
    private http: HttpClient) { }

  getStartEndDates() {
    this.copsService.getStartEndDates().subscribe((response: any[]) => {
      let calMinDateStr = response["startdate"].split('/');
      let calMaxDateStr = response["enddate"].split("/");
      this.calMinDate = new Date(calMinDateStr[2], calMinDateStr[1] - 1, calMinDateStr[0]);
      this.calMaxDate = new Date(calMaxDateStr[2], calMaxDateStr[1] - 1, calMaxDateStr[0]);
      this.getDataForStartEndDays();
    });
  }

  getDataForStartEndDays() {
    
    var ds = { 'startdate': this.startdate, 'enddate': this.endDate, 'tenantname': this.tenant['Tenant_name'] };

    this.copsService.getDataforStartEndDays(ds).subscribe((response: any[]) => {
      this.graphData = [];
      this.showNextDataOnGraph = false;
       response && response.map((item) =>{
         if(item.length > 0){
           let obj = {};
           obj['name'] = item[0].timestamp;
           obj['value'] = item[0].tenants[this.selectedTenantName].tenant_cost;
           this.graphData.push(obj);
         }
       });
       this.calculateGraphPages();
       if(this.graphData.length > this.graphsPerPage) {
        this.showNextDataOnGraph = true;
      }
    });
    
  }

  ngOnInit() { 
   this.selectedTenantName = this.tenant['Tenant_name'];
   this.startOfMonth();
   this.prepareTableObject();

    this.isSideNavOpenSubscription = this.copsService.isSideNavOpen.subscribe(value => {
      this.calculatePages();
    });
  }

  startOfMonth(){
    let startDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.startdate = moment(startDay).format('DD/MM/YYYY');
    this.endDate = moment(this.currentDate).format('DD/MM/YYYY');
    this.widgetDateHeading = this.monthsArray[this.currentDate.getMonth()] + '  ' + this.currentDate.getFullYear();
    this.getStartEndDates();
   }


  setCalStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.calStartDate = event.value;
    const date1 = moment(event.value);
    this.startdate = date1.format('DD/MM/YYYY');
  }


  setCalEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    const date2 = moment(event.value);
    this.endDate = date2.format('DD/MM/YYYY');
  }

  selectDateR(event) {
    if ($("#collapseExample").attr("class") != 'collapse') {
      $("#collapseExample").removeClass($("#collapseExample").attr("class"));
      $("#collapseExample").addClass("collapse");
    } else {
      $("#collapseExample").removeClass($("#collapseExample").attr("class"));
      $("#collapseExample").addClass("collapse");

      $("#collapseExample").addClass("in");
    }  
  }


  prepareTableObject(){
    let data = [];
    this.tenant.vms_cost.map((res)=>{
      let finalVmDataObj = {};
      let arrayOfItems = res.split('[');
      finalVmDataObj['vmName'] = arrayOfItems[0];
      finalVmDataObj['cost'] = arrayOfItems[1].trim().replace(']', '');
      finalVmDataObj['region'] = this.tenant.region;
      data.push(finalVmDataObj);
    });
    this.responseData = data;
    this.filteredData = data;
    this.calculatePages();
  }
  
  
  goToTenantsList() {
    this.closeDetailPage.emit();
  }

  updateFilter(event, colName, innerColname) {
    let searchValue = event.target.value.toLowerCase();
    let matchFound = false;
    //If searchObj has elements and typed column belongs to any available searchObj
    if (this.searchObj.length > 0) {
      this.searchObj.map((ele) => {
        if (ele.key == colName) {
          ele.value = searchValue;
          matchFound = true;
        }
      });
    }

    //If typed column is not there in searchObj push that Column to search
    if (!matchFound) {
      this.searchObj.push({
        'key': colName,
        'value': searchValue
      });
    };

    //Filter only to have non empty Search Criteria
    let finalSearchObj = this.searchObj.filter((obj) => {
      return (obj.value != '');
    });

    //Every Time reset the filtered data
    this.filteredData = [];



    if (finalSearchObj.length > 0) {
      for (let i = 0; i < finalSearchObj.length; i++) {
        let key = finalSearchObj[i].key;
        let searchTextCol = finalSearchObj[i].value;
        //first element searches from whole available devices
        if (i == 0) {
          this.filteredData = this.responseData.filter(function (currItem) {           
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1

          });
        } else {
          //After first element searches from already filtered elements
          this.filteredData = this.filteredData.filter(function (currItem) {
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1
          });
        }
      }
    } else {
      this.filteredData = this.responseData;
    }
    this.calculatePages();
  }
  calculatePages() {
    if (!this.filteredData) {
      this.totalPages = 1;
      this.filteredData = [];
    } else {
      this.totalPages = ((this.filteredData.length % this.rowsPerPage) == 0) ? (this.filteredData.length / this.rowsPerPage) : Math.ceil(this.filteredData.length / this.rowsPerPage);
      this.paginate();
    }
  }


  updateRecPerPage(page) {
    this.rowsPerPage = page;
    this.currentPage = 1;
    this.calculatePages();
  }

  paginate() {
    this.rows = this.filteredData.slice(((this.currentPage - 1) * this.rowsPerPage), ((this.currentPage) * this.rowsPerPage));
  }

  previous() {
    this.currentPage -= 1;
    this.paginate();
  }
  next() {
    this.currentPage += 1;
    this.paginate();
  }

  ngOnDestroy() {
    if(this.isSideNavOpenSubscription){
      this.isSideNavOpenSubscription.unsubscribe();
    }
  }

  

  calculateGraphPages() {
    if (!this.graphData) {
      this.totalGraphPages = 1;
      this.graphData = [];
    } else {
      this.totalGraphPages = ((this.graphData.length % this.graphsPerPage) == 0) ? (this.graphData.length / this.graphsPerPage) : Math.ceil(this.graphData.length / this.graphsPerPage);
      this.paginateGraph();
    }
  }


  updateRecPerGraphPage(page) {
    this.graphsPerPage = page;
    this.currentGraphPage = 1;
    this.calculateGraphPages();
  }

  paginateGraph() {
    this.showDataOngraph = this.graphData.slice(((this.currentGraphPage - 1) * this.graphsPerPage), ((this.currentGraphPage) * this.graphsPerPage));
  }

  previousGraph() {
    this.currentGraphPage -= 1;
    this.paginateGraph();
  }
  nextGraph() {
    this.currentGraphPage += 1;
    this.paginateGraph();
  }

}
