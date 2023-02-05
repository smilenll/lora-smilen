import { DatabaseFactory, DatabaseType } from '../factories/dbFactroy';

export const api = new DatabaseFactory(DatabaseType.MockData).API