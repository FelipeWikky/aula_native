import Realm from 'realm';
import IrpfSchema from '../models/IrpfSchema';

export default async function getRealm(): Promise<any> {
  return Realm.open({
    schema: [IrpfSchema],
  });
}