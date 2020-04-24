import { AsyncStorage } from 'react-native';

import Constants from '../utils/Constants';

class Storage {
  public async save(data: any): Promise<boolean> {
    const storage = await this.getAll();
    storage.push(data);
    await AsyncStorage.setItem(`${Constants.NAME_STORAGE}`, JSON.stringify(storage) );

    return true;
  }

  public async getAll(): Promise<any[]> {
    const response = await AsyncStorage.getItem(`${Constants.NAME_STORAGE}`);

    if (response) {
      return JSON.parse(response);
    }
    return new Array<any>();
  }

  public async clean(): Promise<void> {
    await AsyncStorage.removeItem(`${ Constants.NAME_STORAGE }`);
  }
}

export default new Storage();