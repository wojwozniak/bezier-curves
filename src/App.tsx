import './index.css';
import './oldcss.css'
import Header from './staticComponents/Header';
import Footer from './staticComponents/Footer';
import Center from './components/Center';

const App: React.FC = () => {

  return (
    <div className="app-container bg-bg">
      <Header />
      <Center />
      <Footer />
    </div>
  )
}

export default App