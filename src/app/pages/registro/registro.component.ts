import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    clave: ['', Validators.required]
  });

  async registrarse() {
    if (this.formRegistro.invalid) return;

    const { correo, clave } = this.formRegistro.value;

    try {
      await this.afAuth.createUserWithEmailAndPassword(correo, clave);
      this.router.navigate(['']);
    } catch (error) {
     this.handleError(error);
}
}

volver() {
this.router.navigate(['']);
}

private handleError(error: any) {
// Check for specific errors and provide informative messages
if (error.code === 'auth/email-already-in-use') {
  alert('El correo electrónico ya está en uso. Intenta con otro correo.');
} else {
  alert('Error al registrarse: ' + error.message);
}
console.error(error); // Log the complete error for debugging
}
}
