import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Component, ViewChild, Inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { BindHeaderMangeService } from '../bind-header-mange.service';
import { Menu } from '../shared/Menu';
import { AddEditMenuComponent } from './add-edit-menu/add-edit-menu.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';


 @Component({
  selector: 'app-mange-menu',
  templateUrl: './mange-menu.component.html',
  styleUrls: ['./mange-menu.component.css']
})
export class MangeMenuComponent implements OnInit {
  /**detect displayed column */
  displayedColumns: string[] = ['ranking', 'name', 'link', 'children', 'control'];
  /** data to table */
  dataSource = [];
  /** View Child  */
  @ViewChild(MatTable, {static:false}) table: MatTable<Menu>;
  /**
   * Constructor
   * @param dialog injected value to access AddEditMenuComponent/DeleteConfirmComponent as a dialog
   * @param bind injected value to access BindHeaderMangeService service
   * @param changeDetectorRef injected value to access ChangeDetectorRef
   */
  constructor(public dialog: MatDialog, 
              private bind:BindHeaderMangeService, 
              private  changeDetectorRef: ChangeDetectorRef) {}

 /** OnInit Life Cycle Hook */
  ngOnInit() {
    // check localhost and get dataSource from it
    if (localStorage.getItem('localData')) {
      this.dataSource = JSON.parse(localStorage.getItem('localData'))
      // this.table.renderRows()
    }
    // emit bind subject
    this.bind.bindChanges.next(this.dataSource)
  }
  /**
   * To add data inside table
   */
  addData() {
    // open add dialog
    const dialogRef = this.dialog.open(AddEditMenuComponent, {
      data: {status:'add'}
    })
    // get data from dialog after close it
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      if (data['status'] == 'add') {
        // add data to table 
        this.dataSource.push(data);
        // refresh table rows
        this.table.renderRows()
        // emit bind subject
        this.bind.bindChanges.next(this.dataSource)
        // set data inside localstorage
        localStorage.setItem('localData', JSON.stringify(this.dataSource));
        // console.log(this.dataSource);
      } 
    })
  }
/**
 * To edit row data inside table
 * @param i index of row
 */
  editData(i)
 {
  // open edit dialog and pass data for edit
  const dialogRef = this.dialog.open(AddEditMenuComponent, {
    data: {dataRow:this.dataSource[i], status: 'edit'}
  })
  // console.log(this.dataSource[i]);
  // get data from dialog after close it
  dialogRef.afterClosed().subscribe(data => {
    // console.log(data);
    if (data['status'] == 'edit') {
      // delete previous row and add new one
      this.dataSource.splice(i, 1, data);
      // this.dataSource.push(data);
      // refresh table rows
      this.table.renderRows()
      // emit bind subject
      this.bind.bindChanges.next(this.dataSource)
      // set data inside localstorage
      localStorage.setItem('localData', JSON.stringify(this.dataSource));
    }
  })
  
 }
 /**
  * To delete row data inside table
  * @param i index of row
  */
 deleteData(i) {
   // open confirm delete dialog
  const deleteOneDialogRef = this.dialog.open(DeleteConfirmComponent, {
    data: {status:'one', index : i}
  })
  // get result from confirm dialog after close it
  deleteOneDialogRef.afterClosed().subscribe(result => {
    if (result) {
      // delete confirmed
      // delete row data
      this.dataSource.splice(i, 1);
      // refresh table rows
      this.table.renderRows()
      // emit bind subject
      this.bind.bindChanges.next(this.dataSource)
      // set data inside localstorage
      localStorage.setItem('localData', JSON.stringify(this.dataSource));
     
    }
  })
 }
 /**
  * Trigger on reorder table rows (drag and drop)
  * @param event drag and drop event
  */

 onListDrop(event: CdkDragDrop<string[]>) {
    // Swap the elements around
    const previousIndex = this.dataSource.findIndex(row => row === event.item.data);
    moveItemInArray(this.dataSource,previousIndex, event.currentIndex);
    this.dataSource = this.dataSource.slice();
    // emit bind subject
    this.bind.bindChanges.next(this.dataSource)
    // set data inside localstorage
    localStorage.setItem('localData', JSON.stringify(this.dataSource))
    // detect changes in views
    this.changeDetectorRef.detectChanges()
}
/**
 * Trigger when delete all rows inside table
 */
removeAllData() {
  // open confirm delete dialog
  const deleteAllDialogRef = this.dialog.open(DeleteConfirmComponent, {
    data: {status:'all'}
  })
  // get result from confirm dialog after close it
  deleteAllDialogRef.afterClosed().subscribe(result => {
    if(result) {
      // delete confirmed
      // delete all data
      this.dataSource = [];
      // refresh table rows
      this.table.renderRows();
      // emit bind subject
      this.bind.bindChanges.next(this.dataSource);
      // remove data in localstorage
      localStorage.removeItem('localData');
    }
  })

}
}
