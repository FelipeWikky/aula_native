import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#363636',
    flex:1,
    paddingHorizontal:10,
    justifyContent:'space-between',
  },

  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginBottom:3,
  },

  textName: {
    textAlign: 'center',
    color:'#FFF',
  },
  textAnnualGain:{
    marginBottom:20, 
    color: '#FFF',
  },

  card:{
    padding:5,
    backgroundColor:'#EEE',
    borderWidth:1,
    borderColor:'#EEE',
    borderRadius:4,
    marginBottom:20,
  },
});