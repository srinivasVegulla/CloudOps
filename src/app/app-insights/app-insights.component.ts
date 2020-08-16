import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CopsService } from '../service.component';
@Component({
  selector: 'app-app-insights',
  templateUrl: './app-insights.component.html',
  styleUrls: ['./app-insights.component.scss']
})
export class AppInsightsComponent implements OnInit, OnDestroy {

  @ViewChild('appInsightTable', {static: false}) table: any;
  expanded: any = {};

  appInsightData;
  rows = [];
  responseData = [];
  rowsPerPage = 10;
  recperpage = [5, 10, 15, 20];
  totalPages;
  currentPage = 1;
  filteredData = [];
  searchObj = [];
  billingInfoArray = [
    {"key": "No_of_hours", "displayName": "ACTIVE FOR", "appenedUnit": ""},
    {"key": "No_of_vcpus", "displayName": "VCPU ALLOCATED", "appenedUnit": ""},
    {"key": "Disk", "displayName": "DISK ALLOCATED", "appenedUnit": " GB"},
    {"key": "RAM", "displayName": "RAM ALLOCATED", "appenedUnit": " GB"},
    {"key": "flavor_name", "displayName": "FLAVOUR NAME", "appenedUnit": ""},
    {"key": "vcpus_cost", "displayName": "VCPC COST", "appenedUnit": ""},
    {"key": "disk_cost", "displayName": "DISK COST", "appenedUnit": ""},
    {"key": "RAM_cost", "displayName": "RAM COST", "appenedUnit": ""},
 
  ];
  isSideNavOpenSubscription;

  constructor(private copsService: CopsService) { }

  ngOnInit() {
    this.copsService.getAppInsights().subscribe((response) => {
      this.appInsightData = response["vminfo"];
      this.appInsightData.map((resObj)=> {
        let data = {'vm_id': resObj['id']};
        this.copsService.getBillingData(data).subscribe((response) => {
          resObj['billingData'] = response;
          resObj['hostName'] = resObj['OS-EXT-SRV-ATTR:hypervisor_hostname'];
          resObj['total_flavor_cost'] = response['total_flavor_cost'] ? response['total_flavor_cost'] : '';
        })
      })
      this.responseData = this.appInsightData;
      this.filteredData = this.appInsightData;
      this.calculatePages();
    });

    this.isSideNavOpenSubscription = this.copsService.isSideNavOpen.subscribe(value => {
      this.calculatePages();
    });
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
              if(currItem[key]) {
                return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1
              } else {
                return false;
              }
              
            
          });
        } else {
          //After first element searches from already filtered elements
          this.filteredData = this.filteredData.filter(function (currItem) {
            if (currItem[key]) {
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1
            } else {
              return false;
            }
              
          });
        }
      }
    } else {
      this.filteredData = this.responseData;
    }

    console.log("hi finally", finalSearchObj, this.filteredData);
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

  getAddress(rowData) {
    for (var key in rowData.addresses) {
      //alert("Key: " + key);
      var x = rowData.addresses[key][0]['addr'];
      //if(!row_addr)
      return x;

    }

  }

  getUptimeDays(updatedDate) {
   var currentDate = new Date();
   var serverDate = new Date(updatedDate);
   var diff = currentDate.getTime() - serverDate.getTime();
    var days = (diff / (1000 * 60 * 60 * 24)).toFixed(2);
    return days;

  }

  getBillingdetails(data, header) {
    let  key = header['key'];
    let unit = header['appenedUnit'];
    return data['billingData'][key] + unit;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    
  }

  classForStatus = {
    "ACTIVE": "liteGreen",
    "ERROR": "liteRed"
  }

  getRowClass(row) {
     return {
      'liteGreen': row.status  == 'ACTIVE',
      'liteRed': row.status  == 'ERROR' || row.status  == 'SHUTOFF'  ,
    };
  }

  ngOnDestroy() {
    if(this.isSideNavOpenSubscription){
      this.isSideNavOpenSubscription.unsubscribe();
    }
  }
}