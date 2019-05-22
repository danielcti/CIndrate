import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Home'
import Filtro from './Filtro'

const AppNavigator = createStackNavigator({
    Home
})

export default createAppContainer(AppNavigator)
