import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RefrigeratorComponent } from './refrigerator/refrigerator.component';

@Component({
  selector: 'app-root',
  imports: [RefrigeratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hylastix';
}
