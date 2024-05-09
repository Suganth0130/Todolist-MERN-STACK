import './App.css'
import Start from './Components/Start'
import Home from './Components/Home'
import MyCalendar from './Components/MyCalendar'
import Text from './Components/Text'
function App() {

  return (
    <div className = "appconatiner">
      <Start/>
      <MyCalendar/>
      <Home/> 
      <Text/>
    </div>
  )
}

export default App
