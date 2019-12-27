import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CopsService } from '../service.component';

@Component({
  selector: 'cops-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TicketHistoryComponent implements OnInit {

  @ViewChild('ticHistoryTable', { static: false }) ticHistoryTable: any;

  logInsightData;
  rows;
  filterData;

  constructor(private copsService:CopsService) { }

  ngOnInit() {
    this.copsService.getTicketHistory().subscribe((response)=>{      
      
      this.rows = response;
      this.filterData = response;
      console.log("hi ticHistory data", this.rows);
    });
  }

  filterForeCasts(val){
     console.log("hi val", val)
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
         if(currItem[colName] || !searchValue) {
           if(!searchValue) {
             return true;
           } else {
            return currItem[colName].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
           }
         }
      });
    }

    this.rows = temp;
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.ticHistoryTable.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(EV) {
console.log("hello", EV)
  }

  getFormatedData(row, obj){
    let formatter = obj["formatter"];
    let key = obj["key"];
    if(formatter) {
        return '| '+ formatter;
    } else {
      return '';
    }
  }

  getRowClass(rowIndex) {
    console.log("hi row index", rowIndex);
    return {'xyz': true};
  }

  tableObj = {
    "leftSide" : [{
                    "key": "severity",
                    "displayName": "Priority",
                    "isSpecialCss": true,
                    "formatter": ""
                  },
                  {
                    "key": "severity",
                    "displayName": "Status",
                    "isSpecialCss": false,
                    "formatter": ""
                  },
                  {
                    "key": "severity",
                    "displayName": "IP Address",
                    "isSpecialCss": false,
                    "formatter": ""
                  },
                  {
                    "key": "info",
                    "displayName": "Details",
                    "isSpecialCss": false,
                    "formatter": ""
                  },
                 ],
    "rightSide" :[{
                      "key": "vitrage_resource_type",
                      "displayName": "Integration",
                      "isSpecialCss": false,
                      "formatter": ""
                    },
                    {
                      "key": "severity",
                      "displayName": "Respondes",
                      "isSpecialCss": false,
                      "formatter": ""
                    },
                    {
                      "key": "vitrage_type",
                      "displayName": "Alias",
                      "isSpecialCss": false,
                      "formatter": "lowercase"
                    },
                    {
                      "key": "update_timestamp",
                      "displayName": "Last Updated At",
                      "isSpecialCss": false,
                      "formatter": "date : 'medium'"
                    },
                  ]             
  }
    

  

}
