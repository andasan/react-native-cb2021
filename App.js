import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MapScreen from './src/screens/MapScreen'
import MapListScreen from './src/screens/MapListScreen'
import { setNavigator } from './src/navigationRef'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components'

import { default as theme } from './theme.json';

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator({
    MapView: MapScreen,
    MapList: MapListScreen,
  }),
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <App
        ref={(navigator) => {
          setNavigator(navigator)
        }}
      />
    </ApplicationProvider>
  )
}
