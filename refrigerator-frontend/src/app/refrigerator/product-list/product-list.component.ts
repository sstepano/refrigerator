import { Component, inject } from '@angular/core';
import { Product } from '../../product.model';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Observable } from 'rxjs';

const emptyProduct = {
  name: "",
  timeStored: new Date(),
  bestBeforeDate: new Date(),
  expired: false,
  id: 0
};
enum CheckBoxType { APPLY_FOR_JOB, MODIFY_A_JOB, NONE };

@Component({
  selector: 'app-product-list',
  imports: [DatePipe, ProductFormComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  showModal = false;
  selectedProduct: Product = emptyProduct;
  formType: "UPDATE" | "CREATE" = "CREATE";
  products$!: Observable<Product[]>;
  checked1: boolean = false;
  checked2: boolean = false;

  private productService = inject(ProductService);

  constructor(){
    this.updateProducts();
  }

  updateProducts(){
    this.products$ = this.productService.getProducts();
  }

  handleCheckbox1(){
    this.checked1=!this.checked1;
    this.checked2 = false;
    if(this.checked1){
      this.products$ = this.productService.findByExpired(false);
    } else {
      this.updateProducts();
    }
  }        

  handleCheckbox2(){
    this.checked2=!this.checked2;
    this.checked1 = false;
    if(this.checked2){
      this.products$ = this.productService.findByExpired(true);
    } else {
      this.updateProducts();
    }
  }    

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(() => {
      this.updateProducts();
    });
  }

  updateProduct(product: Product){
    //set the selected product
    this.selectedProduct = product;

    //set the form type (UPDATE)
    this.formType = "UPDATE";

    //open the modal
    this.showModal = true;
  }

  addNewProduct(){
    this.selectedProduct = emptyProduct;
    this.formType = "CREATE";
    this.showModal = true;
  }

  handleModalClose(type: "SUBMIT" | "CANCEL"){
    if(type === "SUBMIT"){
      this.updateProducts();
    }
    this.showModal = false;
  }
}
