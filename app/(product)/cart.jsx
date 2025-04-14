import {StyleSheet, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/emptystate'
import HorizontalCard from '../../components/horizontalcard'
import { useGlobalContext } from '../../global/globalcontext'

const Cart = () => {

  const {getCart} = useGlobalContext()
  const fetchData = getCart();

  //console.log(Cart)
  return (
    <SafeAreaView style={styles.safeArea}>
      
          <FlatList
            style={styles.bigList}
            data = {fetchData}

            keyExtractor = {(item) => item.id}
            renderItem = {({item}) => (
              <HorizontalCard product={item}/>
            )}

            ListEmptyComponent = {() => (
              <EmptyState title="No Product Has Been Bought"/>
            )}
          />

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  safeArea : {
    height:'100%',
    backgroundColor: 'purple',
  },
  headerArea : {
    backgroundColor: 'purple',
    padding: 10
  },
  bigList : {
    backgroundColor:'white',
    padding:20
  },
  bigTxt : {
    fontSize:30,
    fontWeight: 'bold',
  },
  topPart : {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin:0,

  },
  boxCoin : {
    position:'absolute',
    backgroundColor:'white',
    top :70,
    left:270,
    zIndex: 5,
    borderRadius:10,
    paddingHorizontal: 15,
    paddingVertical:8,
    alignItems:'flex-end',
    elevation: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.23, 
    shadowRadius: 10,
    width:100,

  },
  textCoin:{
    fontSize:25,
    fontWeight:'900',
    color:'purple'
  },
  coin : {
    color:'gray'
  },
  egg :{
    position:'absolute',
    width:60,
    height:60,
    left:300,
    top:700,
    zIndex:5,
    backgroundColor:'white',
    borderRadius:'50%',
    alignItems:'center',
    justifyContent:'center',
    elevation:10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.23, 
    shadowRadius: 10,
  },
  fullEgg : {
    width:28,
    height:35,
  }
});