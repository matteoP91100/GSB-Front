import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AccueilComponent } from "./component/accueil/accueil.component";
import { NavBarComponent } from "./component/nav-bar/nav-bar.component";
import { FooterComponent } from "./component/footer/footer.component";
@Component({
    selector: 'app-root',
    standalone:true,
    imports: [AccueilComponent, NavBarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GSB';
}
