import { NgModule } from '@angular/core';
import { MatDialog, MatDialogModule, MatSnackBarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule,
  MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: []
})
export class AppMaterialModule { }
