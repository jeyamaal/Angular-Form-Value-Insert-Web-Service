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
      street_name:[],
      area:[]
    });
  }

  removeAddress(i: number) {
    const control = <FormArray> this.appForm.controls['addresses'];
    control.removeAt(i);
}

onSubmit(){

  this.webService.saveAddress().subscribe(
    (data:Response) =>console.log(data),
    error => console.error(error)
    //completed => console.log("Operation completed")
);
  console.log(this.appForm.value);
}

}
