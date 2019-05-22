import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// import { PieChart } from 'react-native-svg-charts'

export default class Filtro extends Component {
    static navigationOptions = {
        title: 'CIndrata',
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
    this.state = {};
  }

  onPress = (data) => {
      data.solicitou = true
      console.log(`Troca do filtro do bloco ${data.bloco} e andar ${data.andar} solicitada `)
      this.props.navigation.navigate('Home', data)
  }

  render() {
      const filtro = this.props.navigation.state.params
    return (
        <View>
        <Text style={styles.info}>Bloco {filtro.bloco} - Andar {filtro.andar}: {filtro.nivelAgua}</Text>
        {!filtro.solicitou && <TouchableOpacity onPress={() => this.onPress(filtro)}>
         <Text style={styles.troca}>solicitar troca</Text>
        </TouchableOpacity>}
        {filtro.solicitou && <Text style={styles.troca}>Troca já foi solicitada, favor aguardar</Text>}
        </View>

    );
  }
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
    },
    troca: {
        fontSize:20,
        padding: 15
    }
});
