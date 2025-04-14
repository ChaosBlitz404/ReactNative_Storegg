import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, ActivityIndicator, Modal, BackHandler} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductButton from '../components/productbutton'
import image from '../assets/constants/image'
import ProductCard from '../components/productcard'
import EmptyState from '../components/emptystate'
import GridViewIcon from '../assets/images/GridViewIcon'
import { router } from 'expo-router'
import ListViewIcon from '../assets/images/ListViewIcon'
import HorizontalCard from '../components/horizontalcard'
import SearchInput from '../components/searchinput'
import { useQuery } from '@tanstack/react-query'
import {getProduct} from '../library/fetch'
import { useGlobalContext } from '../global/globalcontext'

const App = () => {

  const {Coin} = useGlobalContext()

  const response = useQuery({queryKey: ['products'],queryFn: () => getProduct()});


  const [modalVisible, setModalVisible] = useState(false)
  const {isLoading, isError, data, error, refetch  } = response

  if (isError) {
    return <Text>Error</Text>
  }

  const fetchData = data

  const [Grid, setGrid] = useState(false)
  const [Refreshing, setRefreshing] = useState(false)


  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  }

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true); 
      return true; 
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);


    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  
  return (
    <SafeAreaView style={styles.safeArea}>
        

        <View style={styles.headerArea}>
          <Modal
            visible={modalVisible}
            transparent={true}>
            <View style={styles.modal}>
              <View style={styles.modalInside}>
                <Text style={styles.ask}>Are you sure you want to close Storegg?</Text>
                <View style={styles.optionFlex}>
                  <TouchableOpacity 
                    style={styles.touchableOption}
                    onPress={() => {BackHandler.exitApp()}}>
                      <Text style={styles.ansAsk}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.touchableOption}
                    onPress={() => {setModalVisible(false)}}>
                      <Text style={styles.ansAsk}>No</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
          
          </Modal>
          <SearchInput/>
          <ProductButton title="My Products"/>
          <View style={styles.boxCoin}>
            <Text numberOfLines={1} style={styles.textCoin}>{Coin}</Text>
            <Text style={styles.coin}>My Coins</Text>
          </View>

          <TouchableOpacity 
            style={styles.egg}
            onPress={() => {router.push('/game')}}
            activeOpacity={0.6}
          >
            <Image
              source={image.fullEgg}
              style={styles.fullEgg}

            />
          </TouchableOpacity>
          
        </View>

        <View style={styles.flatListView}>
        {Grid ? (
          <FlatList
            style={styles.bigList}
            data={fetchData}
            numColumns={2}
            key={'G'} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            ListHeaderComponent={() => (
              <View style={styles.topPart}>
                <Text style={styles.bigTxt}>Available Products</Text>
                <TouchableOpacity
                  onPress={() => setGrid(false)}
                  activeOpacity={0.6}
                >
                  <ListViewIcon />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => {
              return isLoading? (<ActivityIndicator size="large" color="#0000ff" animating={true}/>) : (<EmptyState title="No Product Available" />)
            }}
            refreshControl={
              <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <FlatList
            style={styles.bigList}
            data={fetchData}
            numColumns={1} 
            key={'L'} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HorizontalCard product={item} />}
            ListHeaderComponent={() => (
              <View style={styles.topPart}>
                <Text style={styles.bigTxt}>Available Products</Text>
                <TouchableOpacity
                  onPress={() => setGrid(true)}
                  activeOpacity={0.6}
                >
                  <GridViewIcon />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => {
              return isLoading? (<ActivityIndicator size="large" color="#0000ff" animating={true}/>) : (<EmptyState title="No Product Available" />)
            }}
            refreshControl={
              <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
            }


          />
        )}
        </View>

    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  flatListView :{
    flex:1

  },


  touchableOption : {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  optionFlex :{
    display:'flex',
    flexDirection:'row',
    alignItems:'space-between',
    justifyContent:'space-around',
    marginTop : 20,


  },
  ansAsk : {
    fontSize:18,
    alignItems:'center',
    justifyContent:'center',
  },
  ask :{
    fontSize:20,
    fontWeight:'bold'
  },
  modalInside :{
    width:250,
    height:125,
    paddingHorizontal: 15,
    paddingVertical : 10,
    backgroundColor: 'white',
    borderRadius:10,
    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.23, 
    shadowRadius: 10, 
  },
  modal :{
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.4)'
  },
  safeArea : {
    height:'100%',
    backgroundColor: 'white',
    flex: 1
  },
  headerArea : {
    backgroundColor: 'purple',
    padding: 10
  },
  bigList : {
    backgroundColor:'white',
    borderRadius:10,
    padding:20,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    paddingBottom:10,

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
    top :90,
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