import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Home extends Component {
    static navigationOptions = {
        title: 'CIndrate',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
            flexGrow:1,
            alignSelf:'center',
            fontFamily: 'Potra',
            fontSize: 34

        },
      };
       
  constructor(props){
    super(props)
    
    this.onPress = this.onPress.bind(this)
    this.state = {
      data: [
          { id: 0, bloco: 'E', andar: 1, nivelAgua: 70, solicitou: false, funcionarioIndo: false},
          { id: 1, bloco: 'E', andar: 2, nivelAgua: 50, solicitou: false, funcionarioIndo: false},
          { id: 2, bloco: 'E', andar: 3, nivelAgua: 10, solicitou: false, funcionarioIndo: false},
          { id: 3, bloco: 'D', andar: 1, nivelAgua: 20, solicitou: false, funcionarioIndo: false},
          { id: 4, bloco: 'D', andar: 2, nivelAgua: 5, solicitou: false, funcionarioIndo: false},
      ],

  };
  }
		
	onPress = (data) => {
    // ir para a pagina do filtro escolhido
        // console.log(data)
        const id = data.id
        this.props.navigation.navigate('Filtro',this.state.data[id]) //passa como parametro o id do filtro
    }

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.textoFiltro}>Bloco {item.bloco} - Andar {item.andar}: {item.nivelAgua}%</Text>
      {item.solicitou && !item.funcionarioIndo && <Text style={styles.trocaSolicitada}> Troca solicitada</Text>}
      {item.solicitou && item.funcionarioIndo && <Text style={styles.funcionarioIndo}> Funcionario indo trocar</Text>}
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPress(item)}>
            <View style={styles.info}>
                <Icon name="info" size={30} color="#900" />
            </View>
            {/* <Text style={styles.info}>+</Text> */}
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
        borderRadius: 5,
    },
    info:{
        fontSize:30,
        marginTop: 14
    },
    troca:{
        fontSize:20,
        padding: 15
    },
    funcionarioIndo:{
        // padding: 15,
        fontSize: 10
    },
    button:{
        position: 'absolute',
        right: 20
    },
    textoFiltro: {
        fontWeight: 'bold',
        fontSize: 18,
        // fontFamily: 'stibold'
    }
});
