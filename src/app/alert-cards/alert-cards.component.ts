import { Component, OnInit, Input } from '@angular/core';
import { CopsService } from '../service.component';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'cops-alert-cards',
  templateUrl: './alert-cards.component.html',
  styleUrls: ['./alert-cards.component.scss']
})
export class AlertCardsComponent implements OnInit {
  @Input() widget;

  alarmCount;

  constructor(private http:CopsService, private utilityService: UtilityService) {
 }

  ngOnInit() {
    this.http.getAlarmsCount().subscribe((response)=>{      
      this.alarmCount = response;
    });
    
  }
}
