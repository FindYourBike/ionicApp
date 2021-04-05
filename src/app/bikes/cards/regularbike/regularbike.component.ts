import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../../bikes.page';

@Component({
  selector: 'app-regularbike',
  templateUrl: './regularbike.component.html',
  styleUrls: ['./regularbike.component.scss'],
})
export class RegularbikeComponent implements OnInit {

  @Input() bike: IBikeCard;

  constructor() {}

  ngOnInit() {
    console.log(this.bike)
  }

}

export interface IBikeCard extends ICard {
  lon: string;
  id: string;
  lat: string;
  time: number;
  bat: number;
}
