import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public appForm:FormGroup;

  constructor(private fb:FormBuilder,private webService:WebService){
      this.appForm= this.fb.group({
        'name':[],
        addresses:this.fb.array([])

      });

  }


  ngOnInit(){

    this.addAddress();
  }

  addAddress(){
      const control= <FormArray> this.appForm.controls['addresses'];
      const addctrl= this.initAddress();
      control.push(addctrl);
  }

  initAddress(){
    return this.fb.group({
      streetName:[],
      area:[]
    });
  }

  removeAddress(i: number) {
    const control = <FormArray> this.appForm.controls['addresses'];
    control.removeAt(i);
}

onSubmit(){

  console.log("Name in App Component value is"+this.appForm.controls['name'].value);
  console.log("address in App Component value is"+this.appForm.get('addresses').value);
  //console.log(this.addresses.value); 

  this.webService.saveAddress(this.appForm.controls['name'].value,this.appForm.controls['addresses'].value).subscribe(
    (data:Response) =>console.log(data),
    error => console.error(error),
    //completed => console.log("Operation completed")
);


//   this.webService.saveAddress().subscribe(
//     (data:Response) =>console.log(data),
//     error => console.error(error)
//     //completed => console.log("Operation completed")
// );
 // console.log(this.appForm.value);
}

}
