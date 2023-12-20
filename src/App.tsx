import './index.css';
import Header from './staticComponents/Header';
import Footer from './staticComponents/Footer';
import Center from './components/Center';
import InstructionsModal from './components/InstructionsModal';

const App: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-5 bg-bg">
      <Header />
      <InstructionsModal />
      <Center />
      <Footer />
    </div>
  )
}

export default App