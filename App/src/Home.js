import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

export default class Home extends Component {
  constructor(props){
    super(props)
    
    this.onPress = this.onPress.bind(this)
    
    this.state = {
      data: [
          { id: 0, bloco: 'E', andar: 1, nivelAgua: 70},
          { id: 1, bloco: 'E', andar: 2, nivelAgua: 50},
          { id: 2, bloco: 'E', andar: 3, nivelAgua: 10},
          { id: 3, bloco: 'D', andar: 1, nivelAgua: 20},
          { id: 4, bloco: 'D', andar: 2, nivelAgua: 5},
      ],
      changePage: false
  };
  }
		
	onPress = (data) => {
    // ir para a pagina do filtro escolhido
        console.log(data)
        this.setState({changePage: !this.state.changePage})
	}	

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Bloco {item.bloco} - Andar {item.andar}: {item.nivelAgua}%</Text>
      {/* pro + ficar nivelado = gambiarra */}
    {item.nivelAgua < 10 && <Text>  </Text>}  
			<TouchableOpacity
			onPress={() => this.onPress(item)}>
				<Text style={styles.info}>+</Text>
			</TouchableOpacity>
    </View>
  );

  render() {
    return (
        <View>
            <Text style={styles.header}>CIndrata</Text>
            {!this.state.changePage  && <View>
                <FlatList
                style={{ marginTop: 30 }}
                contentContainerStyle={styles.list}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                />
            </View>}
            {this.state.changePage && <View>
                <Text style={styles.listItem}>Bloco D - 2 Andar - 5 %</Text>
                <TouchableOpacity onPress={() => this.onPress()}><Text style={styles.troca}>Solicitar Troca de Água</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.onPress()}><Text style={styles.troca}>Voltar</Text></TouchableOpacity>
            </View>}
        </View>

    );
  }
}

const styles = StyleSheet.create({
	header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
    backgroundColor: '#65a9d7',
    height: 50

  },
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
		paddingLeft: 140 
    },
    troca:{
        fontSize:20,
        padding: 15
    }
});
