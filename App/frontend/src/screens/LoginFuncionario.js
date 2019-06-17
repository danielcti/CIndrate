import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';

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
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
        login: '',
        password: ''
    };
  }

  async componentDidMount(){
    const isLoggedIn = await this._retrieveData()
    console.log(isLoggedIn)
    if(isLoggedIn === 'false'){
        this.props.navigation.navigate('Home', {isLoggedIn: false})
    }else if(isLoggedIn === 'true'){
        this.props.navigation.navigate('Home', {isLoggedIn: true})
    }
  }

  _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null) {
        // We have data!!
        // console.log(value);
        return value
        }
    } catch (error) {
        console.log('erro pegando')
        // Error retrieving data
    }
};

_storeData = async (isLoggedIn) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isLoggedIn);
    //   console.log('salvando')
    } catch (error) {
        console.log(error)
      // Error saving data
    }
  };

  handleLogin = filtro => {
    console.log(`login: ${this.state.login}`)
    console.log(`password: ${this.state.password}`)
    if(this.matchLogin(this.state.login,this.state.password)){
        console.log('login bateu')
        this._storeData('true')
        this.props.navigation.replace('Home', {isLoggedIn: true})
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
    return login === 'admin' && password === 'admin'
  }

  handleNoLogin = () => {
      this._storeData('false')
      this.props.navigation.replace('Home', {isLoggedIn: false})
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
        />
        <TextInput
            style= {styles.inputStyle}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder='senha'
            secureTextEntry={true}
            autoCapitalize='none'
        />
        <TouchableOpacity onPress={() => this.handleLogin(this.props.navigation.state.params)}>
            <View style={styles.trocaButton}>
                <Text style={styles.trocaTexto}>Logar</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleNoLogin}>
            <View style={styles.trocaButton}>
                <Text style={styles.trocaTexto}>Acessar sem login</Text>
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
