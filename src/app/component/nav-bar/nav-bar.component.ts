import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit {
    @ViewChild('navLinks') navLinks!: ElementRef;  // Référence du menu
    @ViewChild('burger') burger!: ElementRef;  // Référence du bouton burger

    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    toggleMenu() {
        // Vérifie si navLinks est défini avant d'y accéder
        if (this.navLinks) {
            this.navLinks.nativeElement.classList.toggle('show');
        }
    }

    closeMenu() {
        // Vérifie si navLinks est défini avant d'y accéder
        if (this.navLinks) {
            this.navLinks.nativeElement.classList.remove('show');
        }
    }

    ngAfterViewInit(): void {
        // Vérifie si le code s'exécute dans le navigateur avant d'utiliser `document`
        if (isPlatformBrowser(this.platformId)) {
            // Vérification des références avant d'ajouter les événements
            if (this.burger && this.navLinks) {
                // Écouteur d'événements pour ouvrir/fermer le menu au clic sur le bouton burger
                this.burger.nativeElement.addEventListener('click', () => {
                    this.toggleMenu(); // Appel à toggleMenu
                });

                // Écouteur d'événements pour fermer le menu lorsqu'un lien est cliqué
                const links = this.navLinks.nativeElement.querySelectorAll('a');
                links.forEach((link: HTMLAnchorElement) => {
                    link.addEventListener('click', () => {
                        this.closeMenu(); // Ferme le menu au clic sur un lien
                    });
                });
            } else {
                console.warn('Burger button or nav links not found');
            }
        }
    }
}
