import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import React from 'react';

export default function App() {
  const [display,setDisplay] = React.useState()
  const [number,setNumber] = React.useState()
  const [answer,setAnswer] = React.useState(0)
  const [sign,setSign] = React.useState()
  const [warning, setWarning] = React.useState()
  const numbers = [1,2,3,4,5,6,7,8,9,0,'.','C','+','-','/','*','=','back']
  const signs = ['+','-','/','*']
  
  const displayThis = (x) =>{
    if (x === 'C'){
      setAnswer(0)
      setNumber()
      setDisplay()
      setSign()
      setWarning()
    }
    else if(x === '='){
      showTotal()
    }
    else if(x === 'back'){
      goBack()
    }

    else{
      if (signs.includes(x)){
        if(signs.includes(number)){
          setDisplay((prev)=> `${prev !=null ? prev.substring(0,prev.length - 1) : ''}${x}`)
        }
        else{
            setDisplay((prev)=> `${prev !=null ? prev : ''}${x}`)
          }

          setSign(x)
        }
      else{
    setDisplay((prev)=> `${prev !=null ? prev : ''}${x}`)}
    setNumber(x)
}
  }

  const numberThis = (x)=>{
    if(x !='C'){
    setNumber((prev)=> `${prev !=null ? parseInt(prev) : 0}${parseInt(x)}`)
  }
  }

  const solve = () =>{
    try{
      if(signs.includes(display[display.length-1])){
    setAnswer(eval(display.substring(0,display.length-1)))}
    else{
      setAnswer(eval(display))
    }
    setWarning()
  }
    catch{
      setWarning('syntax Error')
    }
  }

  const showTotal = ()=>{
    setDisplay(answer)
    setNumber()
    setAnswer(0)
  }

  const goBack = ()=>{
    if(display)setDisplay(prev=>prev.substring(0,prev.length-1))
  }

  React.useEffect(()=>{
    if(display)solve()
  },[display,number])


  return (
    <View style={styles.container}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Calculator App</Text>
      <Text style={styles.answer}>{display}{warning && warning} </Text>
      <Text style={styles.prev}>{sign} </Text>
      <Text style={styles.prev}>{answer} </Text>
      <View style={styles.row} >{numbers.map((x,e)=>{
          return(
                <Text key={e} style={styles.col} onPress={()=>{displayThis(x)}} >{x}</Text>
            )
      })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //padding:50,
    margin:20,
    marginVertical:50,
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'start',
    //justifyContent: 'center',
  },
  row:{
    flex:1,
    justifyCotent:'center',
    alignItems:'center',
    flexDirection :'row',
    flexWrap:'wrap',
  },
  col:{
    flex:2,
    flexBasis:'25%',
    flexGrow:1,
    fontSize:24,
    padding:15,
    flexShrink:2,
    backgroundColor:'lightblue',
    textAlign:'center',
    margin:10,
    color:'black',
    borderRadius:10,
  },

  bt:{
    padding:20,
    
  },

  answer:{
    padding:10,
    marginVertical:10,
    fontSize:48,
    borderWidth:1,
    borderRadius:10,
    margin:10,
    textAlign:'right',
    height:250,
    overflow:'scroll'
  },
  prev:{
    padding:10,
    marginVertical:10,
    fontSize:20,
    textAlign:'right',
    color:'grey'
  },
  total:{
    fontSize:24,
    width:'100%',
    textAlign:'center',
    backgroundColor:'blue',
    padding:15,
    borderRadius:15,
    color:'white'
  }

});
