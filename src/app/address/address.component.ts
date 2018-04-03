import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'address',
  templateUrl: './address.component.html'
})
export class AddressComponent {


  @Input('group')
  public addressForm: FormGroup;

}
