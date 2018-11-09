import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort,MatTableDataSource} from '@angular/material';
import { OutboundService } from './outbound.service';
import { Outbound } from './outbound';
import { AuthService } from '../login/auth.service';



@Component({
  selector: 'app-outbound',
  templateUrl: './outbound.component.html',
  styleUrls: ['./outbound.component.scss'],
  providers: [OutboundService]
})
export class OutboundComponent implements OnInit {

  outbounds: Outbound[];
  outbound: Outbound;
  displayedColumns=['name','dial','dialpattern','callerid','trunk','action'];
  userid: any;



  constructor(public dialog: MatDialog,private outboundService: OutboundService,
  private auth:AuthService) { }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(OutboundDialog, {
      disableClose: false,
      width: '460px',
      height:'570px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.outboundService.getOutbounds(this.userid)
      .subscribe(outbounds => this.outbounds = outbounds);


     
    });
  } 
  
  ngOnInit() {
    this.userid = this.auth.getId();
    this.outboundService.getOutbounds(this.userid)
    .subscribe(outbounds => this.outbounds = outbounds);


  
      
              }
      deleteOutbound(id:any)
  {
    if(confirm("Are you sure"))
    {
    var outbounds=this.outbounds;
    this.outboundService.deleteOutbound(id).subscribe(data =>{

      if(data.n==1)
      {
        for(var i=0;i<outbounds.length;i++)
        {
          if(outbounds[i]._id==id)
          {
            outbounds.splice(i,1);
          }
        }
      }
      this.outboundService.getOutbounds(this.userid)
      .subscribe(outbounds => this.outbounds = outbounds);
    })
  }
}
}
export interface DialogData {
  animal: string;
  name: string;
} 

    @Component({
      selector: 'outbound-dialog',
      templateUrl: 'outbound.dialog.html',
      providers: [OutboundService]
    })
    export class OutboundDialog implements OnInit {
     
      outbounds:Outbound[];
      outbound: Outbound;
      name: any;
      dial: any;
      dialpattern: any;
      callerid:any;
      trunk: any;
      userid: any;

    
      constructor(private outboundService: OutboundService, public dialogRef: MatDialogRef<OutboundDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,private auth:AuthService) {}
        
    
      onNoClick(): void {
        this.dialogRef.close();
      }
     

   
      addOutbound()
      {
      const newOutbound={
    name: this.name,
    dial: this.dial,
    dialpattern: this.dialpattern,
    callerid: this.callerid,
    trunk: this.trunk,
    userid:this.userid
  }
  this.outboundService.addOutbound(newOutbound)
  .subscribe(outbound=>{
 this.outbounds.push(outbound);
 this.outboundService.getOutbounds(this.userid)
.subscribe(outbounds => this.outbounds = outbounds);
  });
  this.dialogRef.close();
  

}

    
ngOnInit() {
  this.userid = this.auth.getId();
  this.outboundService.getOutbounds(this.userid)
  .subscribe(outbounds => this.outbounds = outbounds);
    }

    }
