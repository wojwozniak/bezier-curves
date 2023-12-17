import './index.css';
import Header from './staticComponents/Header';
import Footer from './staticComponents/Footer';
import Center from './components/Center';

const App = () => {

  return (
    <div className="app-container">
      <Header />
      <Center />
      <Footer />
    </div>
  )
}

export default App