import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../../assets/constants/image'
import { useGlobalContext } from '../../global/globalcontext'

const Game = () => {

  const [Luck, setLuck] = useState(0)
  const [coinPosition] = useState(new Animated.Value(0))
  const {changeCoin} = useGlobalContext()
  const [shakeAnimation] = useState(new Animated.Value(0))
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const randomGeneratorNum = () =>{

      startShaking(); 


    setTimeout(() => {
      let rando = Math.floor(Math.random() * 3) + 1;
      setLuck(rando);
      if (rando === 1) {
        changeCoin(100);
        animateCoinUp();
      } else if (rando === 2) {
        changeCoin(50);
        animateCoinUp();
      } else if (rando === 3) {
        changeCoin(20);
        animateCoinUp();
      }
    }, 400);
  }

  const animateCoinUp = () => {
    Animated.timing(coinPosition, {
      toValue: -90,
      duration: 800,  
      useNativeDriver: true
    }).start()
  }

  const startShaking = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10, 
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10, 
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10, 
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0, 
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <SafeAreaView style={styles.fullArea}>
      <ScrollView>
        <View style={styles.coins}>
            <View style={styles.coinComb}>
              <Image
                  source={image.gold}
                  style={styles.gold}
                  resizeMode='contain'
                />
                <Text style={styles.smallValue}>100</Text>
            </View>

            <View style={styles.coinComb}>
              <Image
                source={image.silver}
                style={styles.silver}
                resizeMode='contain'
              />
              <Text style={styles.smallValue}>50</Text>
            </View>
            <View style={styles.coinComb}>
              <Image
                source={image.bronze}
                style={styles.bronze}
                resizeMode='contain'
              />
              <Text style={styles.smallValue}>20</Text>
            </View>

          </View>
          <View style={styles.center}>
            {Luck == 0 && (<View style={styles.bigEgg}>
              <Text style={styles.clickTxt}>Click on the egg to get your prize!</Text>
              <TouchableOpacity
                onPress={() => {
                  randomGeneratorNum()
                  setIsButtonDisabled(true)
                
                }}
                activeOpacity={0.7}
                disabled={isButtonDisabled}
              >
                <Animated.Image
                  source={image.fullEgg}
                  style={[
                    styles.imgEgg,
                    {
                      transform: [
                        {
                          translateX: shakeAnimation
                        },
                      ],
                    },
                  ]}
                />
              </TouchableOpacity>


            </View>)}

            {Luck == 1 && (<View style={styles.bigEgg}>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.clickTxt}>You got a gold coin!</Text>

                <Image
                  source={image.gold}
                  style={styles.coinHidden}
                  resizeMode='contain'
                />

              <Animated.Image
                source={image.gold}
                style={[styles.coinWow, { transform: [{ translateY: coinPosition }] }]} 
              />
                <Image
                  source={image.brokenEgg}
                  style={styles.imgEgg}
                />


              <Text style={styles.added}>100 coins have been added to your balance</Text>
            </View>)}

            {Luck == 2 && (<View style={styles.bigEgg}>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.clickTxt}>You got a silver coin!</Text>
                <Image
                    source={image.silver}
                    style={styles.coinHidden}
                    resizeMode='contain'
                  />
                <Animated.Image
                  source={image.silver}
                  style={[styles.coinWow, { transform: [{ translateY: coinPosition }] }]} 
                />

                <Image
                  source={image.brokenEgg}
                  style={styles.imgEgg}
                />
              <Text style={styles.added}>50 coins have been added to your balance</Text>
            </View>)}

            {Luck == 3 && (<View style={styles.bigEgg}>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.clickTxt}>You got a bronze coin!</Text>

                  <Image
                    source={image.bronze}
                    style={styles.coinHidden}
                    resizeMode='contain'
                  />
                  <Animated.Image
                    source={image.bronze}
                    style={[styles.coinWow, { transform: [{ translateY: coinPosition }] }]} 
                  />

                <Image
                  source={image.brokenEgg}
                  style={styles.imgEgg}
                />


              <Text style={styles.added}>20 coins have been added to your balance</Text>
            </View>)}
            
          </View>
          
      </ScrollView>

    </SafeAreaView>
  )
}

export default Game

const styles = StyleSheet.create({
  coinHidden :{
    width:80,
    height:80,
    marginTop:20,
    opacity:0
  },
  coinWow :{
    width:80,
    height:80,
    marginTop:20,
    position:'absolute'
  },  
  added :{
    textAlign:'center',
    fontSize:20,
    fontWeight:'500'
  },
  imgEgg :{
    marginBottom:20
  },
  congrats :{
    fontSize:27,
    fontWeight:'bold'
  },
  fullArea:{
    height:'100%'
  },
  coins :{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    margin:20,
    gap:30
  },
  gold :{
    width:40,
    height:40,
  },
  silver:{
    height:40,
    width:40
  },
  bronze:{
    width:40,
    height:40
  },
  smallValue :{
    fontSize:15,
    alignItems:'center'
  },
  coinComb:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  bigEgg :{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:500,
    width:250,

  },
  clickTxt :{
    textAlign:'center',
    fontSize:20,
  },
  center :{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
})