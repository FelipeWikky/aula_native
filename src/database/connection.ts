// import * as SQLite from 'expo-sqlite';

// export const database = SQLite.openDatabase('irpfdb.db');

import connect, {sql} from '@databases/expo';

export default function getConnection(databaseName?: string) {
  console.log('database created');
  return {
    database: connect(databaseName || ''),
    sql
  }
}