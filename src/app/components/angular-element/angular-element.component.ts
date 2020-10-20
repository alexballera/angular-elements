import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-angular-element',
  templateUrl: './angular-element.component.html',
  styleUrls: ['./angular-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AngularElementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
