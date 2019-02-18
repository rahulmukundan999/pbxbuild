import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort,MatTableDataSource} from '@angular/material';
import { TrunkService } from './trunk.service';
import { Trunk } from './trunk';
import {AuthService} from '../login/auth.service';



@Component({
  selector: 'app-trunk',
  templateUrl: './trunk.component.html',
  styleUrls: ['./trunk.component.scss'],
  providers: [TrunkService]
})
export class TrunkComponent implements OnInit {

  trunks: Trunk[];
  trunk: Trunk;
  userid: any;

  dataSource;
  displayedColumns=['trunkname','username','password','trunkip','register','action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(public dialog: MatDialog,private trunkService: TrunkService, private auth:AuthService) { }
  ngOnInit() {
    this.userid = this.auth.getId();
    this.trunkService.getTrunks(this.userid)
      .subscribe(trunks => this.dataSource = trunks);
   
  }
     openDialog(): void {
    const dialogRef = this.dialog.open(TrunkDialog, {
      disableClose: false,
      width: '460px',
      height:'570px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.trunkService.getTrunks(this.userid)
      .subscribe(trunks => this.dataSource = trunks);


     
    });
  }
  deleteTrunk(id:any)
  {
    if(confirm("Are you sure"))
    {
    var trunks=this.dataSource;
    this.trunkService.deleteTrunk(id).subscribe(data =>{

      if(data.n==1)
      {
        for(var i=0;i<trunks.length;i++)
        {
          if(trunks[i]._id==id)
          {
            trunks.splice(i,1);
          }
        }
      }
      this.trunkService.getTrunks(this.userid)
      .subscribe(trunks => this.dataSource = trunks);
    })
  }
}
}


export interface DialogData {
  animal: string;
  name: string;
} 

    @Component({
      selector: 'trunk-dialog',
      templateUrl: 'trunk.dialog.html',
      providers: [TrunkService]
    })
    export class TrunkDialog implements OnInit {
     
      trunks:Trunk[];
      trunk: Trunk;
      trunkname: string;
      username1: string;
      password: string;
      trunkip: string;
      register=false;
      userid: any;
      
    
      constructor( public dialogRef: MatDialogRef<TrunkDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,private trunkService: TrunkService,
      private auth:AuthService) {}
       
       
      onNoClick(): void {
        this.dialogRef.close();
      }
     

    
      ngOnInit() {
        this.userid = this.auth.getId();
        this.trunkService.getTrunks(this.userid)
        .subscribe(trunks => this.trunks = trunks);

                 }

                 addTrunk()
                 {
                   var flag = 0;
                   for(var i =0;i<this.trunks.length;i++) {
                     if(this.trunks[i].trunkname === this.trunkname) {
                     flag = 1;
                     }
                   }
                   if(flag === 1) {
                     alert('Name already taken');
                   } else {
                 const newTrunk={
               trunkname: this.trunkname,
               username1: this.username1,
               password: this.password,
               trunkip: this.trunkip,
               register: this.register,
               userid: this.userid,
             }
             this.trunkService.addTrunk(newTrunk)
             .subscribe(trunk=>{
            this.trunkService.getTrunks(this.userid)
           .subscribe(trunks => this.trunks = trunks);
             });
             this.dialogRef.close();
             
            }
           }
           



}
