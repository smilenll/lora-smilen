import { useEffect, useState } from 'react';
import './App.css';
import { AddGuest } from './components/AddGuest/AddGuest';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainCarousel } from './components/MainCarousel/MainCarousel';
import { RegistrationForm } from './components/RegisterForm/RegistrationForm';
import { GuestAuth } from './components/GuestAuth/GuestAuth';
import { EndRegistration } from './components/EndRegistration/EndRegistration';
import { Tabs } from './common/Tabs.enum';
import { ICurrentGuest } from './common/IGuest';
import { api } from './proxies/apiProxy';
import { GuestsList } from './components/GuestsList/GuestsList';

function App() {
  const [guests, setGuests] = useState([]);
  const [currentTab, setCurrentTab] = useState(Tabs.AUTH);
  const [currentGuest, setCurrentGuest] = useState<ICurrentGuest | undefined>();

  const handleGuests = () => {
    api.getGuests().then((res: any) => setGuests(res))
  }

  useEffect(() => {
    handleGuests()
  }, [currentGuest])

  const renderTab = () => {
    switch (currentTab) {
      case Tabs.AUTH:
        return <GuestAuth setCurrentTab={setCurrentTab} setCurrentGuest={setCurrentGuest} />
      case Tabs.REG:
        return <RegistrationForm setCurrentTab={setCurrentTab} currentGuest={currentGuest as ICurrentGuest} setCurrentGuest={setCurrentGuest} />
      case Tabs.END:
        return <EndRegistration currentGuest={currentGuest as ICurrentGuest} setCurrentTab={setCurrentTab} />
      default:
        break;
    }
  }

  return (
    <div className='container'>
      <h1 className="App">
        Нашата сватба
      </h1>
      <MainCarousel />
      <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
        {renderTab()}
      </div>
      <div>
        Програма
      </div>
      <div>
        Artisti
      </div>
      <div>
        Нашата история
      </div>
      <hr></hr>
      <GuestsList guests={guests} />
      <hr></hr>
      <h1>
        Admin Panel
      </h1>
      <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
        <AddGuest handleGuests={handleGuests} />
      </div>
    </ div>
  );
}

export default App;
