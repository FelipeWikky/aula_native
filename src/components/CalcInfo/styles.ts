import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
    borderWidth:1,
    borderRadius:3,
    borderColor:'#CCC',
    backgroundColor:'#363636',
  },
  menu:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  textName:{
    color:'#EEE',
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
  },

  textAnnualGain:{
    fontSize:16,
    fontWeight:'600',
    color:'#EEE',
  },

  infosContainer:{
    marginLeft:10,
  },

  icon:{
    marginRight:15,
  },

  accordionContainer:{
    borderWidth:1,
    borderColor:'#CCC',
    margin:5,
  },
  accordionText: {
    fontSize:16,
    marginLeft:5,
    color:'#EEE',
  },
});