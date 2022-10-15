import './App.css';
import Header from './Components/Header';
import Coins from './Components/Coins';

function App() {
  return (
    <div className="App">
      <Header title="Welcome to Coins Market" />
      <Coins />
    </div>
  );
}

export default App;
