import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-ratting',
  templateUrl: './game-ratting.component.html',
  styleUrls: ['./game-ratting.component.css']
})
export class GameRattingComponent implements OnInit, OnChanges {

  @Input() rating!:number;

  rattingArray!:number[];

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
      this.convert();
  }

  ngOnInit(): void {
   
    
  }

  

  public convert(){
    this.rattingArray = new Array(this.rating);
  }

}
