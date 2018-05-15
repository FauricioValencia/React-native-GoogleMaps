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
  Dimensions,
  Button
} from 'react-native';
import MapView from "react-native-maps";



export default class App extends Component {

  state = {
    focusedLocation:{
      latitude:37.7900352,
      longitude:-122.4013726,
      latitudeDelta:0.0122,
      longitudeDelta://ESCRIBIR BIEN!
        Dimensions.get("window").width
        / Dimensions.get("window").height *
        0.0122
    },
    locationChosen:false
  }
  pickLocationHandler = event =>{
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation, 
      latitude:coords.latitude,
      longitude:coords.longitude
    });
    this.setState(prevState =>{
      return{
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude:coords.longitude
        },
        locationChosen:true
      };
    });
  };
 /* componentDidMount() {
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
}*/

getLocationHandler=()=>{
  navigator.geolocation.getCurrentPosition( pos =>{
    const coordsEvent ={
      nativeEvent:{
        coordinate:{
          latitude:pos.coords.latitude,
          longitude:pos.coords.longitude
        }
      }
    };
    this.pickLocationHandler(coordsEvent);
  }, errer =>{
    console.log(errer);
    alert ("Rectifica que tienes activo el GPS");
  } )
  console.warn(this.state.focusedLocation.latitude +"latitude");
  console.warn(this.state.focusedLocation.longitude + "lingutide");
}

elPunto =()=>{
  if(this.state.locationChosen){
    marker = <MapView.Marker coordinate={this.state.focusedLocation}/>;
  }
  console.warn(`latitud: ${this.state.focusedLocation.latitude} y longitud: ${this.state.focusedLocation.longitude}`);
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
        //region={this.state.focusedLocation}
        style={styles.map}
        onPress={this.pickLocationHandler}
        ref={ref=> this.map=ref}>
        {marker}
        </MapView>
        <View>
          <Button title="Mi ubicación actual" onPress={this.getLocationHandler}/>
          <Button title="El punto que elegi" onPress={this.elPunto}/>
        {/* una idea es que se vaya pintando mientras va seleccionando en la parte de arriba */}
        </View>
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
