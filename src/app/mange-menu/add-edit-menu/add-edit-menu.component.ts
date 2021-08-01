import { Component, OnInit, Output, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Menu } from 'src/app/shared/Menu';

@Component({
  selector: 'app-add-edit-menu',
  templateUrl: './add-edit-menu.component.html',
  styleUrls: ['./add-edit-menu.component.css']
})
export class AddEditMenuComponent implements OnInit {
  /**form to add/edit new item */
  addmenu:FormGroup;
  /**data passed to form when edit */
  editData;
  /**
   * Constructor
   * @param dialogRef injected value to access AddEditMenuComponent as a dialog
   * @param data injected value to pass data from/to dialog
   */
  constructor(public dialogRef: MatDialogRef<AddEditMenuComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  /** OnInit Life Cycle Hook */
  ngOnInit() {
    // prepare edit data 
    this.editData = {
      name:"",
      link:"",
      children:[]
    }
    if (this.data['status'] == 'edit') {

      this.editData = {
        name:this.data['dataRow']['name'],
        link:this.data['dataRow']['link'],
        children:[]
      }
    // create form object
    }
    this.addmenu = new FormGroup({
      "name" : new FormControl(this.editData.name, Validators.required),
      'link' : new FormControl(this.editData.link, [Validators.pattern(/((http(s)?(\:\/\/)))[^\s\b\n|;]*[^.,;:\?\!\@\^\$ -]/g), Validators.required]),
      "children" : new FormArray(this.editData.children),
      'status':new FormControl(this.data['status'])
    })
    // add children to edit data
    if (this.data['status'] == 'edit') {
      if(this.data['dataRow']['children'] !== []) {
        // console.log(this.data['dataRow']['children']);
        
        this.data['dataRow']['children'].forEach(element => {
          this.addItems(element.name, element.link)
        });
      }
    }
  }
  /**
 * To get form array (children) inside form
 * @returns form array 
 */
    getItems() {
    return (<FormArray>this.addmenu.get('children'))
  }

  /**
   * To delete one element inside form array
   * @param i index of element
   */
  deleteItem(i) {
    this.getItems().removeAt(i)
  }

  /**
   * To add one element to form array
   */
  addItems(nameEdit = "", linkEdit = "") {
    let control = new FormGroup({
      'name': new FormControl(nameEdit, Validators.required),
      'link' : new FormControl(linkEdit, [Validators.pattern(/((http(s)?(\:\/\/)))[^\s\b\n|;]*[^.,;:\?\!\@\^\$ -]/g), Validators.required])
    })
    this.getItems().push(control)
  }

  /**
   * To reset and clear form array
   */
  resetItems() {
    this.getItems().reset();
    this.getItems().clear();
  }
  /**
   * Trigger when submit form
   */
   onSubmit() {
    this.data = this.addmenu.value
  }
  /**
   * Trigger when close dialog
   */
  onCloseDialog() {
    this.dialogRef.close()
  }
}
