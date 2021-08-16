import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-info-holder',
  templateUrl: './card-info-holder.component.html',
  styleUrls: ['./card-info-holder.component.scss'],
})
export class CardInfoHolderComponent implements OnInit {
  @Input('date') date: string;
  @Input('category') category: string;
  @Input('liked') liked = false;
  @Input('bookmarked') bookmarked = false;
  @Input('likeCount') likeCount = 0;
  constructor() {}

  ngOnInit() {}
}
