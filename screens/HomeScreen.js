import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notice:
        'Please navigate to Account to sign in or click \nSearch to begin looking for discounts',
    };
  }

  render() {
    return (
      <View
        style={{
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,200,255,0.25)',
        }}>
        <Text style={{fontSize: 32, textAlign: 'center', padding: 25}}>
          Welcome
        </Text>
        <Text style={{fontSize: 24, textAlign: 'center', padding: 25}}>
          {this.state.notice}
        </Text>
        <Image source={require('./Logo.png')} />
      </View>
    );
  }
}

export default HomeScreen;
