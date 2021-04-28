import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { APIService, IBikePing } from 'src/app/services/api.service';

@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {


  @Input() public bike: IBikePing;
  
  constructor(private popover:PopoverController, public service : APIService, private router: Router) { }

  ngOnInit() {
    console.log(this.bike)
  }
  ClosePopover(){
    this.popover.dismiss();
  }

  async tryDeleteBike() {
    var body = {}
    var bikelist = new Array()
    this.service.GetBikes().subscribe(bikes => {
      if(bikes.bikes != undefined || bikes.bikes != null) {
        bikes.bikes.forEach(element => {
          bikelist.push(element)
        });
      }
      console.log(this.bike)
      var index;
      for (var i = 0; i < bikelist.length; i ++) {
        if (bikelist[i].bikeid == this.bike.id) {
          index = i
          console.log("match")
        }
      }
      bikelist.splice(Number(index), 1)
      console.log(bikelist)
      body["bikes"] = bikelist
      this.service.PatchUser(JSON.stringify(body))

    })
    this.router.navigate(['/tabs/bikes']);
  }

}
