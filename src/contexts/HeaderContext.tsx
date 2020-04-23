import React, {createContext, useState, useContext} from 'react';
import {Text} from 'react-native';

interface contextInterface {
  title:string,
  isBack?: boolean,
  goToPage?: string,
  setTitleHeader(newTitle:string):void
}

const HeaderContext = createContext<contextInterface>({} as contextInterface);

export const HeaderProvider: React.FC = ({children}) => {
  const [title, setTitle] = useState('Início');

  function setTitleHeader(newTitle: string) {
    setTitle(newTitle);
  }


  return (
    <HeaderContext.Provider value={{title, setTitleHeader}} >
      {children}
    </HeaderContext.Provider>
  );
}

export default HeaderContext;