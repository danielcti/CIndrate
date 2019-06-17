import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './screens/Home'
import Filtro from './screens/Filtro'
import LoginFuncionario from './screens/LoginFuncionario'

const AppNavigator = createStackNavigator({
    Home, Filtro, LoginFuncionario
},
{
    initialRouteName: 'LoginFuncionario',
    headerLayoutPreset: 'center' ,
    cardStyle: {
        backgroundColor: '#87CEEB'
    }
  }
)

export default createAppContainer(AppNavigator)
