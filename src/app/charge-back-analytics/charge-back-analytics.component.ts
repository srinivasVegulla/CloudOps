import { Component, OnInit, OnDestroy } from '@angular/core';
import { CopsService } from '../service.component';

@Component({
  selector: 'app-charge-back-analytics',
  templateUrl: './charge-back-analytics.component.html',
  styleUrls: ['./charge-back-analytics.component.scss']
})
export class ChargeBackAnalyticsComponent implements OnInit, OnDestroy {

  rows = [];
  responseData = [];
  rowsPerPage = 10;
  recperpage = [5, 10, 15, 20];
  totalPages;
  currentPage = 1;
  filteredData = [];
  searchObj = [];
  isSideNavOpenSubscription;
  isLoading = true;
  dummyData = [
    {"tenantName": "Admin", "region": "INDIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "130", "penality": "3"},
    {"tenantName": "EEASS", "region": "NEW YORK", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "200", "penality": "13"},
    {"tenantName": "services", "region": "RUSSIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "45", "penality": "6"},
    {"tenantName": "test_mq", "region": "INDIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "28", "penality": "9"},
    {"tenantName": "Admin", "region": "INDIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "130", "penality": "3"},
    {"tenantName": "EEASS", "region": "NEW YORK", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "200", "penality": "13"},
    {"tenantName": "services", "region": "RUSSIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "45", "penality": "6"},
    {"tenantName": "test_mq", "region": "INDIA", "cluster": "CLOUDOPS", "mBy": "VEGULLA", "bAmount": "28", "penality": "9"},
  ];

  isDetailPage;
  selectedTenant;
 // listOfTenants = ['admin', 'cloudforms', 'demo', 'eeaas', 'services', 'test_mq'];
 listOfTenants;

  constructor(private copsService: CopsService) { }

  ngOnInit() {
    this.copsService.getTenantsList().subscribe((response) => {
      this.listOfTenants = response
     // this.listOfTenants = data;
    },(error)=> {
      this.listOfTenants = ['admin', 'cloudforms', 'demo', 'eeaas', 'services', 'test_mq'];
    });

    this.copsService.getTenantsDetails().subscribe((response) => {
      let data = [];
      for(var key in response) {       
        if(this.listOfTenants.indexOf(key) > -1) {
          data.push(response[key]);
        }
      }
      this.isLoading = false;
      this.responseData = data;
      this.filteredData = data;
      this.calculatePages();
    });
    

    this.isSideNavOpenSubscription = this.copsService.isSideNavOpen.subscribe(value => {
      this.calculatePages();
    });
  }

  goToDetailPage(row){
    this.isDetailPage = true;
    this.selectedTenant = row;
  }

  closedDetailPage() {
    this.isDetailPage = false;
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