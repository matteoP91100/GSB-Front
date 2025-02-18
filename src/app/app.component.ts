import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AccueilComponent } from "./component/accueil/accueil.component";
import { NavBarComponent } from "./component/nav-bar/nav-bar.component";
@Component({
    selector: 'app-root',
    standalone:true,
    imports: [AccueilComponent, NavBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GSB';
}
