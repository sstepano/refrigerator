import { Component } from '@angular/core';
import { TitleComponent } from "./title/title.component";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: 'app-refrigerator',
  imports: [TitleComponent, ProductListComponent],
  templateUrl: './refrigerator.component.html',
  styleUrl: './refrigerator.component.css'
})
export class RefrigeratorComponent {

}
