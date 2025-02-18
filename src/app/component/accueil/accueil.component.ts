import { Component } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
    selector: 'app-accueil',
    standalone:true,
    imports: [NavBarComponent],
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
