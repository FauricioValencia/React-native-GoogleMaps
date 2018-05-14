/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MapView from "react-native-maps";





export default class App extends Component {

  state = {
    focusedLocation:{
      latitude:37.7900352,
      longitude:-122.4013726,
      latitudeDelta:0.0122,
      lontitudeDelta:
        Dimensions.get("window").width
        / Dimensions.get("window").height *
        0.0122
    },
    locationChosen:false
  }
  pickLocationHandler = event =>{
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState =>{
      return{
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude:coords.longitude
        },
        locationChosen:true
      }
    })
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                  region: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: 0.0462,
                      longitudeDelta: 0.0261,
                  },
              });
          },
          (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
}
  render() {
    let marker = null;

    if(this.state.locationChosen){
      marker = <MapView.Marker coordinate={this.state.focusedLocation}/>;
    }
    return (
      <View style={styles.container}>
        <MapView
        initialRegion={this.state.focusedLocation}
        region={this.state.focusedLocation}
        style={styles.map}
        onPress={this.pickLocationHandler}>
        {marker}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height:250,
    width:"100%"
    
  },
  
});
