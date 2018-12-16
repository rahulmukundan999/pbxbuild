import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort,MatTableDataSource} from '@angular/material';
import { RingService } from './ring.service';
import { Ring } from './ring';
import { AuthService } from '../login/auth.service';




@Component({
  selector: 'app-ring',
  templateUrl: './ring.component.html',
  styleUrls: ['./ring.component.scss'],
  providers: [RingService]
})
export class RingComponent implements OnInit {

  rings: Ring[];
  ring: Ring;
  userid: any;
  dataSource;
  displayedColumns=['name','extension','timeout','action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  constructor(public dialog: MatDialog,private ringService: RingService,private auth : AuthService) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(RingDialog, {
      disableClose: false,
      width: '460px',
      height:'370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ringService.getRings(this.userid)
      .subscribe(rings => this.dataSource = rings);


     
    });
  } 
  
  ngOnInit() {
    this.userid = this.auth.getId();
    this.ringService.getRings(this.userid)
    .subscribe(rings => this.dataSource = rings);


  
      
              }
      deleteRing(id:any)
  {
    if(confirm("Are you sure"))
    {
    var rings=this.dataSource;
    this.ringService.deleteRing(id).subscribe(data =>{

      if(data.n==1)
      {
        for(var i=0;i<rings.length;i++)
        {
          if(rings[i]._id==id)
          {
            rings.splice(i,1);
          }
        }
      }
      this.ringService.getRings(this.userid)
      .subscribe(rings => this.dataSource = rings);
    })
  }
}
}
export interface DialogData {
  animal: string;
  name: string;
} 

    @Component({
      selector: 'ring-dialog',
      templateUrl: 'ring.dialog.html',
      providers: [RingService]
    })
    export class RingDialog implements OnInit {
     
    
      rings:Ring[];
      ring: Ring;
      name: any;
      extension: any;
      timeout: any;
      userid: any;
    
      constructor( private ringService: RingService,public dialogRef: MatDialogRef<RingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,private auth: AuthService) {}
        
     
    
      onNoClick(): void {
        this.dialogRef.close();
      }
     

 
      addRing()
      {
        var flag = 0;
        for(var i=0;i<this.rings.length;i++) {
          if(this.rings[i].name === this.name) {
            flag = 1;
          }
        }
        if(flag === 1) {
          alert('Name already taken');
        } else {
      const newRing={
    name: this.name,
    extension: this.extension,
    timeout: this.timeout,
    userid: this.userid,
  }
  this.ringService.addRing(newRing)
  .subscribe(ring=>{
 this.rings.push(ring);
 this.ringService.getRings(this.userid)
.subscribe(rings => this.rings = rings);
  });
  this.dialogRef.close();
  
        }
}

    
ngOnInit() {
  this.userid = this.auth.getId();
  this.ringService.getRings(this.userid)
  .subscribe(rings => this.rings = rings);
    }

    }
