import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ProgressCircle from 'react-native-progress-circle'

export default class Filtro extends Component {
    static navigationOptions = {
        title: 'CIndrate',
        leg:'',
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
    this.onSolicitaTroca = this.onSolicitaTroca.bind(this)
    this.onAceitaTroca = this.onAceitaTroca.bind(this)
    this.state = {};
  }

  onSolicitaTroca = (data) => {
      data.solicitou = true
    //   console.log(`Troca do filtro do bloco ${data.bloco} e andar ${data.andar} solicitada `)
      this.props.navigation.navigate('Home', data)
  }

  onAceitaTroca = (data) => {
      this.props.navigation.navigate('LoginFuncionario', data)
  }

  render() {
      const filtro = this.props.navigation.state.params
    return (
        <View>
            <View style={styles.circulo}>
                <ProgressCircle
                    percent={filtro.nivelAgua}
                    radius={80}
                    borderWidth={10}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff">
                    <Text style={{ fontSize: 30 }}>{filtro.nivelAgua.toString()} %</Text>
                </ProgressCircle>
            </View>
        <Text style={styles.info}>Bloco {filtro.bloco} - Andar {filtro.andar}: {filtro.nivelAgua}%</Text>
        {!filtro.solicitou && <TouchableOpacity onPress={() => this.onSolicitaTroca(filtro)}>
            <View style={styles.trocaButton}>
                <Text style={styles.trocaTexto}>Solicitar troca</Text>
            </View>
        </TouchableOpacity>}
        {(filtro.solicitou && !filtro.funcionarioIndo) &&
        <View style={styles.trocaButton}>
        <Text style={styles.trocaTexto}>Troca já foi solicitada, aguardando funcionário aceitar a solicitação</Text>
        <TouchableOpacity onPress={() => this.onAceitaTroca(filtro)}><Text style={styles.trocaTexto}>Trocar</Text></TouchableOpacity>
        </View>
        }
        {(filtro.solicitou && filtro.funcionarioIndo) && <View><Text>Funcionario indo</Text></View>}
        </View>

    );
  }
}

const styles = StyleSheet.create({
    info: {
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    trocaTexto: {
        fontSize:20,
        padding: 10,
    },
    trocaButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 70,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
      },
      circulo: {
        margin: 10,
        alignItems: 'center',
      },
});