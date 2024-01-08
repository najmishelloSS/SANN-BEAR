import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
=======
import { NavController } from '@ionic/angular';

>>>>>>> Stashed changes

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
<<<<<<< Updated upstream

  constructor() { }
=======
  constructor(private navCtrl: NavController) { }  // Inject NavController
>>>>>>> Stashed changes

  ngOnInit() {
  }

<<<<<<< Updated upstream
  navigate(route, direction){
    console.log("Go " + direction + " to " +route )
=======
  navigate(route, direction) {
    console.log("Go " + direction + " to " + route);

    // Implement navigation logic
    if (direction === 'forward') {
      this.navCtrl.navigateForward(route);
    } else if (direction === 'back') {
      this.navCtrl.navigateBack(route);
    }
    // Add more conditions if needed
>>>>>>> Stashed changes
  }

}
