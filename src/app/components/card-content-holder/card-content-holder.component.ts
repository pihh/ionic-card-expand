import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-content-holder',
  templateUrl: './card-content-holder.component.html',
  styleUrls: ['./card-content-holder.component.scss'],
})
export class CardContentHolderComponent implements OnInit {
  @Input('title') title: string;
  constructor() {}

  ngOnInit() {}
}
