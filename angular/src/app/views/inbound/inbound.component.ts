import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort,MatTableDataSource} from '@angular/material';
import { InboundService } from './inbound.service';
import { Inbound } from './inbound';
import { Extension } from '../extension/extension';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss'],
  providers: [InboundService]
})
export class InboundComponent implements OnInit {

  inbounds: Inbound[];
  inbound: Inbound;
  userid: any;
  displayedColumns=['name','didnumber','playback','ringgroup','forext','formob','action'];

  constructor(public dialog: MatDialog,private inboundService: InboundService, private auth:AuthService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(InboundDialog, {
      disableClose: false,
      width: '460px',
      height:'570px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.inboundService.getInbounds(this.userid)
      .subscribe(inbounds => this.inbounds = inbounds);


     
    });
  } 
  
  ngOnInit() {
    this.userid = this.auth.getId();
    this.inboundService.getInbounds(this.userid)
    .subscribe(inbounds => this.inbounds = inbounds);
 }
      deleteInbound(id:any)
  {
    if(confirm("Are you sure"))
    {
    var inbounds=this.inbounds;
    this.inboundService.deleteInbound(id).subscribe(data =>{

      if(data.n==1)
      {
        for(var i=0;i<inbounds.length;i++)
        {
          if(inbounds[i]._id==id)
          {
            inbounds.splice(i,1);
          }
        }
      }
      this.inboundService.getInbounds(this.userid)
      .subscribe(inbounds => this.inbounds = inbounds);
    })
  }
}
}
export interface DialogData {
  animal: string;
  name: string;
} 

    @Component({
      selector: 'inbound-dialog',
      templateUrl: 'inbound.dialog.html',
      providers: [InboundService]
    })
    export class InboundDialog implements OnInit {

extensions:Extension[];
extension:Extension;
      inbounds:Inbound[];
      inbound: Inbound;
      name: string;
      didnumber: string;
      playback: string;
      ringgroup:any;
      forext:any;
      formob:any;
      disable=false;
      disable1=false;
      disable2=false;
      userid: string;
      textAreaEmpty()
      {
if(this.ringgroup!='')
{
          this.disable1=true;
          this.disable2=true;
}
else if(this.ringgroup=='')
{
          this.disable1=false;
          this.disable2=false;
}
      }
textAreaEmpty1()
{
  if(this.forext!='')
{
          this.disable=true;
          this.disable2=true;
}
else if(this.forext=='')
{
          this.disable=false;
          this.disable2=false;
}


}
textAreaEmpty2()
{
if(this.formob!='')
{
          this.disable=true;
          this.disable1=true;
}else if(this.formob=='')
{
          this.disable=false;
          this.disable1=false;
}
}
      
      
    
      constructor( public dialogRef: MatDialogRef<InboundDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,private inboundService: InboundService,
      private auth:AuthService) {}
        
    
      onNoClick(): void {
        this.dialogRef.close();
      }
     

      addInbound()
      {
        var flag = 0;
        for(var i=0;i<this.inbounds.length;i++) {
          if(this.inbounds[i].name === this.name) {
            flag = 1;
          }
        }
         if(flag === 1) {
           alert('Name already exist');
         } else {

      const newInbound={
        name: this.name,
        didnumber: this.didnumber,
        playback: this.playback,
        ringgroup:this.ringgroup,
        forext:this.forext,
        formob:this.formob,
        userid: this.userid
  }
  this.inboundService.addInbound(newInbound)
  .subscribe(inbound=>{
 this.inbounds.push(inbound);
 this.inboundService.getInbounds(this.userid)
.subscribe(inbounds => this.inbounds = inbounds);
  });
  this.dialogRef.close();
  
         }
}

    
ngOnInit() {
this.userid = this.auth.getId();
  this.inboundService.getInbounds(this.userid)
  .subscribe(inbounds => this.inbounds = inbounds);
  this.inboundService.getExtensions(this.userid)
  .subscribe(extensions => this.extensions = extensions);



    }

    }
