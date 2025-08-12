import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  standalone:true,
  selector: 'app-janela-icons-dialog',
  imports:[MatDialogModule, MatFormFieldModule],
  templateUrl: 'janela-icons.component.html',
})
export class JanelaIconsComponent {

  constructor(
    public dialogRef: MatDialogRef<JanelaIconsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

}