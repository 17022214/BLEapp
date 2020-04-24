import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

//https://www.polidea.com/blog/ReactNative_and_Bluetooth_to_An_Other_level/

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
    this.manager = new BleManager();
    this.state = {info: '', values: {}};
    this.prefixUUID = 'f000aa';
    this.suffixUUID = '-0451-4000-b000-000000000000';
    this.sensors = {
      0: 'Temperature',
      1: 'Accelerometer',
      2: 'Humidity',
      3: 'Magnetometer',
      4: 'Barometer',
      5: 'Gyroscope',
    };
  }
  serviceUUID(num) {
    return this.prefixUUID + num + '0' + this.suffixUUID;
  }

  notifyUUID(num) {
    return this.prefixUUID + num + '1' + this.suffixUUID;
  }

  writeUUID(num) {
    return this.prefixUUID + num + '2' + this.suffixUUID;
  }

  info(message) {
    this.setState({info: message});
  }

  error(message) {
    this.setState({info: 'ERROR: ' + message});
  }

  updateValue(key, value) {
    this.setState({values: {...this.state.values, [key]: value}});
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.manager.onStateChange(state => {
        if (state === 'PoweredOn') this.scanAndConnect();
      });
    } else {
      this.scanAndConnect();
    }
  }
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info('Scanning...');
      console.log(device);

      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === 'RDL51822' || device.name === 'RDL51822 (iBeacon)') {
        this.info('Connecting to TI Sensor');
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            this.info('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            this.info('Setting notifications');
            return this.setupNotifications(device);
          })
          .then(
            () => {
              this.info('Listening...');
            },
            error => {
              this.error(error.message);
            },
          );
      } else {
        this.manager.stopDeviceScan();
      }
    });
  }
  async setupNotifications(device) {
    for (const id in this.sensors) {
      const service = this.serviceUUID(id);
      const characteristicW = this.writeUUID(id);
      const characteristicN = this.notifyUUID(id);

      const characteristic = await device.writeCharacteristicWithResponseForService(
        service,
        characteristicW,
        'AQ==' /* 0x01 in hex */,
      );

      device.monitorCharacteristicForService(
        service,
        characteristicN,
        (error, characteristic) => {
          if (error) {
            this.error(error.message);
            return;
          }
          this.updateValue(characteristic.uuid, characteristic.value);
        },
      );
    }
  }

  //Display contents on screen
  render() {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,200,255,0.25)',
        }}>
        <Text style={{fontSize: 32, textAlign: 'center', padding: 25}}>
          Search
        </Text>
        <View>
          <Text>{this.state.info}</Text>
          {Object.keys(this.sensors).map(key => {
            return (
              <Text key={key}>
                {this.sensors[key] +
                  ': ' +
                  (this.state.values[this.notifyUUID(key)] || '-')}
              </Text>
            );
          })}
        </View>
        <View style={{justifyContent: 'flex-end', flex: 7}}>
          <Button
            title={'Search for devices'}
            onPress={this.scanAndConnect()}
          />
        </View>
      </View>
    );
  }
}

export default SearchScreen;
