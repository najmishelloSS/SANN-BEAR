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

![HTML][HTML]


	<ion-button (click)="presentAlert()">Click Me</ion-button>

![TS][TS]


	constructor(
		private alertController:AlertController,
	) {}
 
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

<br>
<br>

`Modal`

![HTML][HTML]


	<ion-button (click)="setOpen(true,'modal')">Open Modal</ion-button>

![TS][TS]

	setOpen(isOpen: boolean) {
		this.history = history
		this.modal = isOpen;
	}

<br>
<br>

`Routing`

![HTML][HTML]


	<ion-button (click)="navigate('home')">Navigate</ion-button>

![TS][TS]

	constructor(
	    private router:Router,
	    private navCtrl:NavController,
	    private route:ActivatedRoute,
	    private dataService:DataService,
	) {}

	ngOnInit() {
	    if(this.route.snapshot.data['special']){
	      this.data=this.route.snapshot.data['special'];
	    }
	}
   
	navigate(route: any){
	    this.navCtrl.setDirection("forward",false);
	    this.data.page = this.data.page+1
	    this.dataService.setData(this.data.page, this.data);
	    this.router.navigateByUrl(route+'/'+this.data.page);
	}

![APP][APP]

	  {
	    path: 'home/:id',
	    resolve:{
	      special:DataResolverService
	    }, 
	    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
	  },

<br>
<br>

`API Implementation`

![TS][TS]

	constructor(
 		private http:HttpClient
	){}

 	connectApi(){
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
			
		let formData = new FormData();
		formData.append('id',this.id);
		formData.append('data',this.data);

	     	this.http.post('https://www.google.com', formData).subscribe( (data:any) => { //this is for post api
		      console.log(data)
		}), async error => {
	 		console.log(error)
		};

      		this.http.get('https://www.google.com').subscribe(async data=>{ //this is for get api
			console.log(data)
		}), async error => {
	 		console.log(error)
		};
   	}

<br>
<br>

`FIle Upload Implementation`

![HTML][HTML]


	<ion-input type="file" (change)="onFileChange($event)"></ion-input>


![TS][TS]

	file:File
	constructor(){}

	  onFileChange(fileChangeEvent)
	  {
	        this.file = fileChangeEvent.target.files[0]
	        console.log(this.file)
	  }



<p align="right">(<a href="#readme-top">back to top</a>)</p>

[HTML]:https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[TS]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[APP]: https://img.shields.io/badge/-app%E2%80%93routing.module.ts-lightblue


	
