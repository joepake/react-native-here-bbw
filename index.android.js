/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import MapView from './MapView';

export default class HereMapsRN extends Component {

  render() {
    return (

      <MapView
        style={{flex : 1, backgroundColor: 'yellow'}}
        center="37.615223,-122.431297"
        mapType="normal"
        initialZoom={9} />
    );
  }
}

AppRegistry.registerComponent('HereMapsRN', () => HereMapsRN);
