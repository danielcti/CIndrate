import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';


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
    this.onLogIn = this.onLogIn.bind(this)
    this.state = {
        login: '',
        password: ''
    };
  }

  onLogIn = filtro => {
    console.log(`login: ${this.state.login}`)
    console.log(`password: ${this.state.password}`)
    if(this.matchLogin(this.state.login,this.state.password)){
        console.log('login bateu')
        filtro.trocaAceita = true
        this.props.navigation.navigate('Home', filtro)
    }else{
        this.setState({password: ''})
        Alert.alert(
            'Login e senha nao combinaram, favor tentar novamente.',
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }
  }

  matchLogin = (login,password) => {
    return login === 'abc' && password === '123'
  }

  render() {
    //   const filtro = this.props.navigation.state.params
    return (
        <View style={styles.containerStyle} keyboardShouldPersistTaps='never'>
        <TextInput
            keyboardShouldPersistTaps='never'
            style={styles.inputStyle}
            onChangeText={(login) => this.setState({login})}
            value={this.state.login}
            placeholder='login'
            autoCapitalize='none'
            autoFocus='true'
        />
        <TextInput
            style= {styles.inputStyle}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder='senha'
            secureTextEntry={true}
            autoCapitalize='none'
        />
        <TouchableOpacity onPress={() => this.onLogIn(this.props.navigation.state.params)}>
            <View style={styles.trocaButton}>
                <Text style={styles.trocaTexto}>Logar</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    inputStyle:{
        color: '#333',
        fontSize: 16,
        lineHeight: 23,  
        borderBottomColor: '#333',
        borderBottomWidth: 0.5,
        fontFamily: 'System',
    },
    containerStyle:{
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10
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
    
});
