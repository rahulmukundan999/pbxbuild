import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort,MatTableDataSource} from '@angular/material';
import { ExtensionService } from './extension.service';
import { Extension } from './extension';
import { MatTableModule, MatSortModule } from '@angular/material';
import { CdkTableModule} from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss'],
  providers: [ExtensionService]
})
export class ExtensionComponent implements OnInit {

  dataSource;
  displayedColumns=['extensionno','displayname','outboundcid','password','email','action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  extensions: Extension[];
  extension: Extension;
  userid: any;
  limit:any;

  
  constructor(public dialog: MatDialog,private extensionService: ExtensionService,
  private auth: AuthService) { }
 
  openDialog(): void {
    if(this.limit === 0) {
      alert("Extension Limit Full....Please Upgrade");
    } else {
    const dialogRef = this.dialog.open(ExtensionDialog, {
      disableClose: false,
      width: '460px',
      height:'370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.extensionService.getExtensions(this.userid)
      .subscribe(extensions => this.extensions = extensions);
      this.extensionService.getExtensions(this.userid)
      .subscribe(extensions =>  this.dataSource=new MatTableDataSource(extensions));
      this.extensionService.getLimit(this.userid)
      .subscribe(limit => {
        this.limit = limit[0].limit;
        console.log('limit',this.limit);
      });

     
    });
  }
  } 
  
  ngOnInit() {
    this.userid = this.auth.getId();
    console.log(this.userid);
    this.extensionService.getExtensions(this.userid)
    .subscribe(extensions => {
      this.extensions = extensions;
      console.log(extensions);
    });
    this.extensionService.getLimit(this.userid)
    .subscribe(limit => {
      this.limit = limit[0].limit;
      console.log('limit',this.limit);
    });
    this.extensionService.getExtensions(this.userid)
    .subscribe(extensions =>  this.dataSource=new MatTableDataSource(extensions));
  
      
              }
      deleteExtension(id:any,extensionno:any)
  {
    if(confirm("Are you sure"))
    {
    var extensions=this.extensions;
    this.extensionService.deleteExtension(id,extensionno).subscribe(data =>{

      if(data.n==1)
      {
        for(var i=0;i<extensions.length;i++)
        {
          if(extensions[i]._id==id)
          {
            extensions.splice(i,1);
          }
        }
      }
      this.extensionService.getExtensions(this.userid)
      .subscribe(extensions => this.extensions = extensions);
      this.dataSource=new MatTableDataSource(extensions);
      this.extensionService.getlextension(this.userid,++this.limit)
 .subscribe(limits => {
   console.log(limits);
   this.extensionService.getLimit(this.userid)
   .subscribe(limit => {
     this.limit = limit[0].limit;
     console.log('limit',this.limit);
   });
 });
    })
  }
}
}
export interface DialogData {
  animal: string;
  name: string;
} 

    @Component({
      selector: 'extension-dialog',
      templateUrl: 'extension.dialog.html',
      providers: [ExtensionService]
    })
    export class ExtensionDialog implements OnInit {
      extensions:Extension[];
      extension: Extension;
      extensionno: string;
      displayname: string;
      outboundcid: string;
      password: string;
      email: string;
      userid: any;
      limit:any;
    
    
      constructor(private extensionService: ExtensionService, public dialogRef: MatDialogRef<ExtensionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private auth: AuthService) {}
        

    
      onNoClick(): void {
        this.dialogRef.close();
      }
     

      addExtension()
      {
        var flag = 0;
        for(var i=0;i<this.extensions.length;i++) {
          if(this.extensions[i].extensionno === this.extensionno)
          flag = 1;
        }
        if(flag === 1) {
          alert('Name exist please choose new name');
        } else if(flag === 0) {
      const newExtension={
      userid: this.userid,
      extensionno: this.extensionno,
      displayname: this.displayname,
      outboundcid: this.outboundcid,
      password: this.password,
      email: this.email
  }
  this.extensionService.addExtension(newExtension)
  .subscribe(extension=>{
 alert(extension.msg);
 this.extensionService.getlextension(this.userid,--this.limit[0].limit)
 .subscribe(limits => {
   console.log(limits)
 });
 this.extensionService.getExtensions(this.userid)
.subscribe(extensions => this.extensions = extensions);
  });
  this.dialogRef.close();
}
}

    
ngOnInit() {
  this.userid = this.auth.getId();
  this.extensionService.getExtensions(this.userid)
  .subscribe(extensions => this.extensions = extensions);
  this.extensionService.getLimit(this.userid)
    .subscribe(limit => {
      console.log('limit',limit);
      this.limit = limit;
      console.log(this.limit[0].limit);
    });
    }
    
 }
