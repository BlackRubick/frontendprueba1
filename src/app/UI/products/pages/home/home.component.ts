import { Component } from '@angular/core';
import { CreateProductComponentComponent } from '../../components/create-product-component/create-product-component.component';
import { GetAllProductComponent } from '../../components/get-all-product/get-all-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GetAllProductComponent, CommonModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) {}

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponentComponent, {

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró');
    });
  }
}
