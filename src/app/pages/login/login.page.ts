import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseService, User } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  username: string = '';
  password: string = '';
  users: User[] = []; // Array para almacenar los usuarios

  constructor(private databaseService: DatabaseService, private router:Router, private serviceUsuario:UsuarioService) {

  }

  ngOnInit() {
    this.databaseService.initializePlugin();
  }

  async submitForm() {
    const users: User[] = await this.databaseService.loadUsers();
    const user = users.find((u) => u.name === this.username && u.password === this.password);
    if (user) {
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.username
        }
      };
      this.serviceUsuario.capturarUsuario(this.username);
      this.router.navigate(['/home'], navigationExtras);
    }
  }
}