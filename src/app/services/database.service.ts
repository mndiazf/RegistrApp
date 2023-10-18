import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private user: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {}

  async initializePlugin() {
    try {
      this.db = await this.sqlite.createConnection(DB_USERS, false, 'no-encryption', 1, false);
      await this.db.open();
  
      const userSchema = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL
      );`;
      await this.db.execute(userSchema);
      
      const existingUsers = await this.loadUsers();
    
      if (existingUsers.length === 0) {
        // Si no hay usuarios en la base de datos, crea usuarios de prueba
        await this.createUser('Usuario1', '1234');
        await this.createUser('Usuario2', '1234');
      }
    } catch (error) {
      console.error('Error al inicializar el plugin:', error);
      throw error;
    }
  }
  


async loadUsers(): Promise<User[]> {
  try {
    const result = await this.db.query('SELECT * FROM users;');
    return result.values || [];
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    throw error;
  }
}

async createUser(name: string, password: string) {
  try {
    const query = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await this.db.query(query, [name, password]);
    await this.loadUsers();
    return result;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}



}
