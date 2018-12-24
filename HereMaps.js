// MapView.js

import React, { PropTypes } from 'react';
import {
  View,
  Button,
  NativeModules,
  requireNativeComponent,
  findNodeHandle
} from 'react-native';

const MAP_TYPES = {
  NORMAL: 'normal',
  SATELLITE: 'satellite',
};

const MapViewComponent = NativeModules.MapView;
const UIManager = NativeModules.UIManager;

HereMaps.propTypes = {
  ...View.propTypes, // include the default view properties
  style: View.propTypes.style,
  center: PropTypes.string,
  mapType: PropTypes.oneOf(Object.values(MAP_TYPES)),
  initialZoom: PropTypes.number
};

const HereMapView = requireNativeComponent('HereMapView', HereMaps);

class HereMaps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      zoomLevel: 15,
      center: this.props.center
    };

    this._onMapReady = this._onMapReady.bind(this);
  }

  // componentWillUpdate() is invoked immediately before rendering when
  // new props or state are being received. Use this as an opportunity
  // to perform preparation before an update occurs. This method is not called
  // for the initial render.
  componentWillUpdate(nextProps) {
  }

  // componentDidMount() is invoked immediately after a component is mounted.
  // Initialization that requires DOM nodes should go here. If you need to load
  // data from a remote endpoint, this is a good place to instantiate the
  // network request. Setting state in this method will trigger a re-rendering.
  componentDidMount() {
    const { isReady } = this.state;
    if (isReady) {
    }
  }

  render() {
    return (

      <HereMapView
        style={this.props.style}
        center={this.props.center}
        mapType={this.props.mapType}
        initialZoom={this.props.initialZoom} >

        <View style={{
          position: 'absolute', top: 10, right: 10,
          width: 50, height: 120,
          justifyContent: 'space-between', zIndex: 10
        }}>

          <Button
            title="+"
            onPress={this.onZoomInPress} />

          <Button
            title="-"
            onPress={this.onZoomOutPress} />

          <Button
            title="o"
            onPress={this.onSetCenterPress} />

        </View>
      </HereMapView>
    );
  }

  _onMapReady() {
    this.setState({ isReady: true });
  }

  onZoomInPress = () => {
    if (this.state.zoomLevel < 20) {
      this.setState({ zoomLevel: this.state.zoomLevel + 1 });
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.HereMapView.Commands.zoomIn,
        [this.state.zoomLevel]);
    }
  }

  onZoomOutPress = () => {
    if (this.state.zoomLevel > 0) {
      this.setState({ zoomLevel: this.state.zoomLevel - 1 });
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.HereMapView.Commands.zoomOut,
        [this.state.zoomLevel]);
    }
  }

  onSetCenterPress = () => {
    this.setState({ center: this.state.center });
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.HereMapView.Commands.setCenter,
      [this.state.center]);
  }

}

module.exports = HereMaps;
