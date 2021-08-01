import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/shared/Menu';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  /**
   * Constructor
   * @param dialogRef injected value to access DeleteConfirmComponent as a dialog
   */
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) { }
  ngOnInit() {
  }
  /**
   * Trigger on close confirm delete dialog
   */
  onClose() {
    this.dialogRef.close()
  }

}
