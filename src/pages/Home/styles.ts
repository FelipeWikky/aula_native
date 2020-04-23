import * as RN from 'react-native';

export default RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 3,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  describe: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
    marginTop: 5,
    textAlign:'center',
  },

  input: {
    borderWidth: 2,
    borderRadius: 4,
    height: 25,
    marginTop: 3,
    borderColor: '#FF00',
    backgroundColor: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputError: {
    color:'#F00',
    fontWeight:'bold',
    textAlign:'center',
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    backgroundColor: '#2A44CC',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 10
  },
});