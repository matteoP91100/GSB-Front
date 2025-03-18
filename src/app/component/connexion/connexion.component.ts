import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-connexion',
    imports: [RouterOutlet, RouterModule, ReactiveFormsModule, NgFor, CommonModule,HttpClientModule],
    templateUrl: './connexion.component.html',
    styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        // Rediriger l'utilisateur vers une page après une connexion réussie
        console.log('Connexion réussie:', response);
        this.router.navigate(['/dashboard']);  // Exemple de redirection vers une page protégée
      },
      (error) => {
        console.error('Erreur de connexion:', error);
      }
    );
  }
} {

}
