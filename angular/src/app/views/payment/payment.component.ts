import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';


import { NgForm } from '@angular/forms';
import {PaymentService} from './payment.service';
import { AuthService } from '../login/auth.service';
import { RouterModule, Routes,Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[PaymentService]
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  paydis = false;
  id: any;
  name:any;
  email:any;
  plan: any;
  extension: any;
  public payPalConfig?: PayPalConfig;

  constructor(private cd: ChangeDetectorRef, private payment: PaymentService,public auth:AuthService,
  private route : Router ) {}

  ngOnInit() {
    this.id = this.auth.getPayToken();
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AeKIfAx7QGuQpdHYiomDZJ6yZbq4v4IDNbIhz4Io9S9WxRwyeWfIcv582AEmaEKF7m2QvRj_-6PMAo7E'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log(data,actions);
        console.log('OnPaymentComplete');
        this.initextension();
        var a = {
          id:this.id,
          extension:this.extension,
          index:2
        };
        this.payment.stripecharge(a).subscribe(data=>{
          console.log(data);
          if(data.status === 200) {
            alert('Paid Successfully ....Please Login');
            this.auth.logout();
            this.route.navigate(['login']);
          } else {
            alert('Sorry could not transact');
          }
          this.paydis = false;
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
        console.log(data);
        alert('Payment failed');
      },
      onError: (err) => {
        console.log(err);
        console.log('OnError');
        //alert('Error in payment.....');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: parseInt(this.plan)
        }
      }]
    });
  }
  paypalcheck() {
    this.initConfig();
  }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  async onSubmit(form: NgForm) {
    this.paydis = true;
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      this.paydis = false;
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      this.initextension();
      var a = {
        token:token.id,
        id:this.id,
        amount:this.plan,
        extension:this.extension,
        index:1
      }
      this.payment.stripecharge(a).subscribe(data=>{
        console.log(data);
        if(data.status === 200) {
          alert('Paid Successfully ....Please Login');
          this.auth.logout();
          this.route.navigate(['login']);
        } else {
          alert('Sorry could not transact');
        }
        this.paydis = false;
      });
      // ...send the token to the your backend to process the charge
    }
  }
  initextension() {
    switch(this.plan) {
      case '100':this.extension = 1000;
      break;
      case '250':this.extension = 2500;
      break;
      case '500':this.extension = 10000;
      break;
      case '1000':this.extension = 100000;
      break;
    }
  }
  tabClick(event) {
    console.log(event.index);
    if(event.index === 1) {
      console.log('hello');
      this.initConfig();
    }
  }
}