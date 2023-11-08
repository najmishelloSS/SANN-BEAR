<a name="readme-top"></a>
# ionic installation

step 1 - `Install Node.js` via https://nodejs.org/en/<br><br>
step 2 - `Install Ionic` via Command Prompt or Powershell <br>

	npm install -g @ionic/cli
				 
step 3 - `Create Ionic Project` via Command Prompt or Powershell in desired directory <br>

	ionic start
step 4 - `Integrate App into Project` via steps below <br>
<ul>
	<li>Download the src and tsconfig.json file in the repository</li>
	<li>Go to the project directory eg. C:\Users\user\Documents\Project\AppName</li>
	<li>Replace both existing src and tsconfig.json file with the downloaded file from the repository</li>
</ul>
	
step 5 - `Run App` via Command Prompt or Powershell in the project directory<br>

	ionic serve

# Run App on Android Studio

step 1 - `Integrate App Android Configuration into Project` via steps below <br>
<ul>
	<li>Download the android file in the repository</li>
	<li>Move the android file into the project directory eg. C:\Users\user\Documents\Project\AppName</li>
</ul>

step 2 - `Install Capacitor Plugin for Android` via Command Prompt or Powershell in the project directory<br>

	npm install @capacitor/android@latest

step 3 - `Build Project into Android Studio` via Command Prompt or Powershell in the project directory<br>

	ionic capacitor build android

 # Important Dependencies
 step 1 - `Install Ionic Storage` via Command Prompt or Powershell <br>

	npm install @ionic/storage

 step 2 - `Install Angular Storage-` via Command Prompt or Powershell <br>

	npm install @ionic/storage-angular

 # Ionic Components
`Alert`
<br>
<br>
![HTML][HTML]
![TS][TS]


	  <ion-button (click)="presentAlert()">Click Me</ion-button>

![TS][TS]

	  async presentAlert() {
	    const alert = await this.alertController.create({
	      header: 'Alert',
	      subHeader: 'Important message',
	      message: 'This is an alert!',
	      buttons: [{
	            text: 'Cancel',
	            role: 'cancel'
	          },
	          {
	            text: 'OK,
	            handler: () => {
	              console.log("ok")
	            }
	          }],
	
	    });
	
	    await alert.present();
	  }


<p align="right">(<a href="#readme-top">back to top</a>)</p>

[HTML]:https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[TS]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white

	
