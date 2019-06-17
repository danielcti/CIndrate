import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './screens/Home/Home'
import Filtro from './screens/Filtro/Filtro'
import LoginFuncionario from './screens/LoginFuncionario/LoginFuncionario'

const AppNavigator = createStackNavigator({
    Home, Filtro, LoginFuncionario
},
{
    headerLayoutPreset: 'center' ,
    cardStyle: {
        backgroundColor: '#87CEEB'
    }
  }
)

export default createAppContainer(AppNavigator)
