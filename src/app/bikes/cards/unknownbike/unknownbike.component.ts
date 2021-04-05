import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../../bikes.page';

@Component({
  selector: 'app-unknownbike',
  templateUrl: './unknownbike.component.html',
  styleUrls: ['./unknownbike.component.scss'],
})
export class UnknownbikeComponent implements OnInit {

  @Input() bike: ICard;
  
  constructor() { }

  ngOnInit() {}

}
