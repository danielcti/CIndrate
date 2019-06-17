import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import io from 'socket.io-client'

import api from '../../services/api'

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
    
    // this.handleInfo = this.handleInfo.bind(this)
    this.state = {
      filtros: [],
  };
  }

  async componentDidMount(){
		this.registerSocket();

    const response = await api.get('filtros');

    this.setState({ filtros: response.data })
	}
	
	registerSocket = () => {
		const socket = io('http://192.168.0.114:3333')

		socket.on('filtro', newFiltro => {
				this.setState({ filtros: [newFiltro, ... this.state.filtros] })
		})

		socket.on('solicita', filtroSolicitado => {
				this.setState({
						filtros: this.state.filtros.map(filtro => (
								filtro._id === filtroSolicitado._id ? filtroSolicitado : filtro
						))
				})
        })
        
        socket.on('aceita', filtroAceito => {
            this.setState({
                    filtros: this.state.filtros.map(filtro => (
                            filtro._id === filtroAceito._id ? filtroAceito : filtro
                    ))
            })
    })
}
		
	// ir para a pagina do filtro escolhido
	handleInfo = (id) => { 
		const selectedFilter = this.state.filtros.find(
			filtro => (filtro._id === id)
		)
		this.props.navigation.navigate('Filtro',selectedFilter) //passa como parametro o id do filtro
    }

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.textoFiltro}>Bloco {item.bloco} - Andar {item.andar}: {item.nivel}%</Text>
      {item.trocaSolicitada && !item.trocaAceita && <Text style={styles.trocaSolicitada}> Troca solicitada</Text>}
      {item.solicitou && item.trocaAceita && <Text style={styles.trocaAceita}> Funcionario indo trocar</Text>}
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleInfo(item._id)}>
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
            data={this.state.filtros}
            renderItem={this.renderItem}
            keyExtractor = { item => item._id }
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