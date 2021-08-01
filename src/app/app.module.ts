import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MangeMenuComponent } from './mange-menu/mange-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { AddEditMenuComponent } from './mange-menu/add-edit-menu/add-edit-menu.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DeleteConfirmComponent } from './mange-menu/delete-confirm/delete-confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MangeMenuComponent,
    AddEditMenuComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEditMenuComponent,
    DeleteConfirmComponent
  ]
})
export class AppModule { }
