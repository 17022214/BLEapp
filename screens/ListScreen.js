import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beacon_data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Promotion One',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Promotion Two',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Promotion Three',
        }, //Initial data to be used in FlatList
      ],
    };
  }
  Item({title}) {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          alignItems: 'stretch',
        }}>
        <Text style={{fontSize: 20}}>{title}</Text>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'space-around',
          flex: 1,
          backgroundColor: 'rgba(0,200,255,0.25)',
        }}>
        <Text style={{fontSize: 32, textAlign: 'center', padding: 25}}>
          Recent Promotions
        </Text>
        <View>
          <FlatList
            data={this.state.beacon_data}
            renderItem={({item}) => <this.Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

export default ListScreen;
