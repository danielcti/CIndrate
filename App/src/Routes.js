import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Home'
import Filtro from './Filtro'

const AppNavigator = createStackNavigator({
    Home, Filtro
},
{
    headerLayoutPreset: 'center' ,
    cardStyle: {
        backgroundColor: '#87CEEB'
    }
  }
)

export default createAppContainer(AppNavigator)
