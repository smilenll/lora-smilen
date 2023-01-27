import { IDBService } from "../common/IDBServices";
import { FirebaseServices } from "../services/firebaseServices";
import { MockServices } from "../services/mockServices";

export enum DatabaseType {
  MockData,
  Firebase,
}

export class DatabaseFactory {
  public API!: IDBService;

  constructor(database: DatabaseType) {
    this.setApi(database);
  }

  private setApi(database: DatabaseType) {
    switch (database) {
      case DatabaseType.Firebase:
        this.API = new FirebaseServices();
        break;
      case DatabaseType.MockData:
        this.API = new MockServices();
        break;
      default:
        console.error("No DB Set");
    }
  }
}
