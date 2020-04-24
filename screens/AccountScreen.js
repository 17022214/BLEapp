import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      balance: 0,
      name: 'New User',
    };
  }

  render() {
    return (
      <View
        style={{
          padding: 5,
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,200,255,0.25)',
        }}>
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            flex: 2,
          }}>
          <Image
            source={require('./barcode.png')}
            style={{width: 180, height: 180}}
          />
          <Text style={{fontSize: 32, textAlign: 'center', padding: 25}}>
            {this.state.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text style={{fontSize: 26, textAlign: 'center', padding: 25}}>
            Current rewards balance:
          </Text>
          <Text style={{fontSize: 26, textAlign: 'center', padding: 10}}>
            {this.state.balance}
          </Text>
        </View>
      </View>
    );
  }
}

export default AccountScreen;
