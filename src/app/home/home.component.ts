import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private winRef: WindowRefService) { }

  ngOnInit(): void {
  }

  createRzpayOrder(data:any) {
    console.log(data);
    // call api to create order_id
    this.payWithRazor();
  }

  public payWithRazor() {
    const options: any = {
      key: 'rzp_test_oJPbj9rC1rDGAQ',
      amount: 1000, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
     // order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
    
      prefill: {
        name: 'azorpay',
        email: 'testing@razorpay.com',
        contact: '+918888888888',
        'card[number]': '4111111111111111',
        'card[expiry]': '1123',
        'card[cvv]': '123'
      }
    };
    options.handler = ((response:any, error:any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
  

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
