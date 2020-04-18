import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import api from './src/services/api';

type User = {
  name?:string,
  gain?:Number,
}

interface Irpf {
  name:string,
  gain?:number
}

export default function App() {
  const [user, setUser] = useState<User>();

  const [name, setName] = useState('');
  const [gain, setGain] = useState(0);


  const nameRef = useRef<TextInput>(null);
  const gainRef = useRef<TextInput>(null);

  async function irpf():Promise<void> {
    try {
      //const response = await api.get(`/irpf/${gain}/${name}`);
      // const data = await response.data;
      const body = {
        name: name,
        gain: gain,
      }

      const response = await api.post('/irpf', body);
      console.log(response);
      // const data = await response.data;
      //console.log(data);

    } catch(err) {
      console.log(err);
    }
  }

  function getUser() : User {
    nameRef.current!.focus();
    return {
      name, gain,
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Informe seu Nome</Text>
      <TextInput 
        ref={nameRef}
        style={styles.input} 
        value={name}
        onChangeText={setName}
      />

      <Text>Informe seu Ganho Anual</Text>
      <TextInput 
        ref={gainRef}
        style={styles.input} 
        value={String(gain)}
        onChangeText={text => setGain(Number(text))}
      />

      <Button title='Enviar' onPress={irpf} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth:1,
    borderRadius:4,
    borderColor:'#FF3636',
    textAlign:'center',
    marginBottom:10,
  },
  input2:{
    borderWidth:3,
    borderColor:'#000',

  },
});
