import { Injectable, WritableSignal, signal  } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private user: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {
  }

  async initializeDatabase() {
    this.db = await this.sqlite.createConnection(DB_USERS, false, 'no-encryption', 1, false);
    await this.db.open();

    const userSchema = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    );`;

    await this.db.execute(userSchema);
    this.loadUsers();
    await this.createUser('Usuario1', '1234');
    await this.createUser('Usuario2', '1234');
  }


  async loadUsers(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM users;');
    return result.values || [];
  }

  async createUser(name: string, password: string) {
    const query = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await this.db.query(query, [name, password]);
    this.loadUsers();
    return result;
  }



  async findUserByUsernameAndPassword(username: string, password: string): Promise<boolean> {
    const query = `
      SELECT COUNT(*) AS userCount
      FROM users
      WHERE username = ? AND password = ?;
    `;
  
    const result = await this.db.query(query, [username, password]);
  
    if (result.values && result.values.length > 0) {
      const userCount = result.values[0].userCount as number;
      return userCount === 1;
    }
  
    return false; // Si result.values es undefined o no hay filas, retornar falso
  }
  
}