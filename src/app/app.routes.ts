import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AboutComponent } from './component/about/about.component';
import { NgModule } from '@angular/core';
import { NewnotesComponent } from './component/notedefrais/newnotes/newnotes.component';
import { FraisauforfaitComponent } from './component/fraisauforfait/fraisauforfait.component';
import { FraishorsforfaitComponent } from './component/fraishorsforfait/fraishorsforfait.component';
import { ListComponent } from './component/notedefrais/list/list.component';
import { ListUserComponent } from './component/user/list/list.component';

export const routes: Routes = [
{path: 'home',component: AccueilComponent},
{path: 'about',component: AboutComponent},
{path: 'connexion',component: ConnexionComponent},
{path: 'newnotes',component: NewnotesComponent},
{path: 'listnotes',component: ListComponent},
{path: 'horsforfait',component: FraishorsforfaitComponent},
{path: 'forfait',component: FraisauforfaitComponent},
{path: 'listuser',component: ListUserComponent}

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{}
