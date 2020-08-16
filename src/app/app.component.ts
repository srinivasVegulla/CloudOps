import { Component, ViewEncapsulation } from '@angular/core';
//import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Cops';
  ngOnInit() {
    /* this.AssignForm = this.fb.group({
       assigneename: ['', Validators.required]
     });*/
    
   //$('.selectpicker').selectpicker('refresh');
   }
}
