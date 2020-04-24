import Realm from 'realm';
//import IrpfSchema from '../../backup/IrpfSchema';

export default async function getRealm(): Promise<any> {
  return Realm.open({
    schema: [/**/],
  });
}