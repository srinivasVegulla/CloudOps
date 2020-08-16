import { Component, OnInit, OnDestroy } from '@angular/core';
import { CopsService } from '../service.component';

@Component({
  selector: 'app-auto-remediation-logs',
  templateUrl: './auto-remediation-logs.component.html',
  styleUrls: ['./auto-remediation-logs.component.scss']
})
export class AutoRemediationLogsComponent implements OnInit, OnDestroy {

  constructor(private copsService: CopsService) { }
  autoRemediationData;
  rows = [];
  responseData = [];
  rowsPerPage = 10;
  recperpage = [5, 10, 15, 20];
  totalPages;
  currentPage = 1;
  filteredData = [];
  searchObj = [];
  isSideNavOpenSubscription;

  ngOnInit() {
    this.copsService.getAutoRemediationLogsData().subscribe((response)=>{      
      this.autoRemediationData = response["hits"]["hits"];
      let data = [];
      for(let i=0; i<this.autoRemediationData.length; i++) {
        data.push(this.autoRemediationData[i]["_source"]);
      }
      this.responseData = data;
      this.filteredData = data;
      console.log("hi autoRemedeiation data", data )
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
            if (key == 'host') {
              return currItem[key]['name'].toLowerCase().indexOf(searchTextCol) !== -1
            } else {
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1
            }
          });
        } else {
          //After first element searches from already filtered elements
          this.filteredData = this.filteredData.filter(function (currItem) {
            if (key == 'host') {
              return currItem[key]['name'].toLowerCase().indexOf(searchTextCol) !== -1
            } else {
              return currItem[key].toLowerCase().indexOf(searchTextCol) !== -1
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

  ngOnDestroy() {
    if(this.isSideNavOpenSubscription){
      this.isSideNavOpenSubscription.unsubscribe();
    }
  }

}
