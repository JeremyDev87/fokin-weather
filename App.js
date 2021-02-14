import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import axios from 'axios';
import * as Location from 'expo-location';

const API_KEY = "3e210721c7f1cdec5647b5a88e1fbe3f";

export default class extends React.Component {
    state = {
        isLoading: true
    };
    getWeather = async (latitude, longitude) => {
        const {data} = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        //console.log(data);
        this.setState({isLoading:false, temp:data.main.temp})
    }
    getLocation = async () => {
        try {
            // throw Error();
            await Location.requestPermissionsAsync();
            const {
                coords: {
                    latitude,
                    longitude
                }
            } = await Location.getCurrentPositionAsync();
            this.getWeather(latitude, longitude);
            // console.log(latitude); console.log(longitude);
            //this.setState({isLoading: false});
            // console.log(this.state.isLoading);
        } catch (error) {
            Alert.alert("can't find you", "So sad");
        }

    }
    componentDidMount() {
        this.getLocation();
    }
    render() {
        const {isLoading,temp} = this.state;
        return isLoading
            ? <Loading/>
            : <Weather temp={Math.round(temp)}/>;

    }
}
