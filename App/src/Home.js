import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
// import {} from 'react-navigation'

export default class Home extends Component {
    static navigationOptions = {
        title: 'CIndrate',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          flexGrow:1,
          alignSelf:'center',
        },
      };
       
  constructor(props){
    super(props)
    
    this.onPress = this.onPress.bind(this)
    this.state = {
      data: [
          { id: 0, bloco: 'E', andar: 1, nivelAgua: 70, solicitou: false},
          { id: 1, bloco: 'E', andar: 2, nivelAgua: 50, solicitou: false},
          { id: 2, bloco: 'E', andar: 3, nivelAgua: 10, solicitou: false},
          { id: 3, bloco: 'D', andar: 1, nivelAgua: 20, solicitou: false},
          { id: 4, bloco: 'D', andar: 2, nivelAgua: 5, solicitou: false},
      ],

  };
  }
		
	onPress = (data) => {
    // ir para a pagina do filtro escolhido
        console.log(data)
        const id = data.id
        this.props.navigation.navigate('Filtro',this.state.data[id]) //passa como parametro o id do filtro
    }

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Bloco {item.bloco} - Andar {item.andar}: {item.nivelAgua}%</Text>
      {item.solicitou && <Text style={styles.trocaSolicitada}> Troca solicitada</Text>}
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPress(item)}>
            <Text style={styles.info}>+</Text>
        </TouchableOpacity>
    </View>
  );

  render() {
    return (
        <View>
            <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor = { (item, index) => index.toString() }
            />
        </View>

    );
  }
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
    },

    listItem: {
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
    },
    info:{
        fontSize:30,
    },
    troca:{
        fontSize:20,
        padding: 15
    },
    button:{
        position: 'absolute',
        right: 30
    },
    trocaSolicitada: {
        // flexDirection: 'column',
}
});
