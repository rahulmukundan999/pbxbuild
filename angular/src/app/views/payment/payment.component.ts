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
  paydis = true;
  id: any;
  name:any;
  email:any;
  plan: any;
  public payPalConfig?: PayPalConfig;

  constructor(private cd: ChangeDetectorRef, private payment: PaymentService,private auth:AuthService,
  private route : Router ) {}

  ngOnInit() {
    this.id = this.auth.getPayToken();
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'yourSandboxKey'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: 9
        }
      }]
    });
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
    this.paydis = false;
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      this.paydis = true;
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      var a = {
        token:token.id,
        id:this.id,
        amount:this.plan
      }
      this.payment.stripecharge(a).subscribe(data=>{
        this.paydis = true;
        console.log(data);
        if(data.status === 200) {
          alert('Paid Successfully ....Please Login');
          this.auth.logout();
          this.route.navigate(['login']);
        } else {
          alert('Sorry could not transact');
        }
      });
      // ...send the token to the your backend to process the charge
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