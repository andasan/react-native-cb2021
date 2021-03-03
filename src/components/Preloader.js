import React, { useEffect, useRef } from 'react'
import { Animated, Easing, View, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: '#fcdeec',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const SpinInView = (props) => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      })
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View style={{ ...props.style, transform: [{ rotate: spin }] }}>
      {props.children}
    </Animated.View>
  )
}

const Preloader = () => {
  return (
    <View style={styles.container}>
      <SpinInView>
        <Image
          style={styles.logo}
          source={require('../../assets/cherryblossom.png')}
        />
      </SpinInView>
    </View>
  )
}

export default Preloader
