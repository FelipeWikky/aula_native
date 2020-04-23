import React, {createContext, useState, useContext} from 'react';

interface contextInterface {
  title:string,
  setTitleHeader(newTitle:string):void,
  
  backButton?: boolean,
  showBackButton(isBack: boolean): void,

  goToPage?: string,
}

const HeaderContext = createContext<contextInterface>({} as contextInterface);

export const HeaderProvider: React.FC = ({children}) => {
  const [title, setTitle] = useState('Início');
  const [backButton, setBackButton] = useState(false);

  function setTitleHeader(newTitle: string) {
    setTitle(newTitle);
  }

  function showBackButton(isBack: boolean) {
    setBackButton(isBack);
  }


  return (
    <HeaderContext.Provider value={{title, setTitleHeader, backButton, showBackButton}} >
      {children}
    </HeaderContext.Provider>
  );
}

export default HeaderContext;