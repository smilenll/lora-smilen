import { useEffect, useState } from 'react';
import './App.css';
import { AddGuest } from './components/AddGuest';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainCarousel } from './components/MainCarousel';
import { RegistrationForm } from './components/RegisterForm/RegistrationForm';
import { GuestAuth } from './components/GuestAuth/GuestAuth';
import { EndRegistration } from './components/EndRegistration.tsx/EndRegistration';
import { Tabs } from './common/Tabs.enum';
import { ICurrentGuest } from './common/IGuest';
import { api } from './proxies/apiProxy';

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
        return <EndRegistration currentGuest={currentGuest as ICurrentGuest} setCurrentTab={setCurrentTab}/>
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
      <div>
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
      <h1>
        Admin Panel

      </h1>
      <AddGuest handleGuests={handleGuests} />
      <ul>
        {guests.map((guest: ICurrentGuest) => (
          <li key={guest.name + Math.random()}>{guest.name} {guest.lastName} {guest.menu} {guest.nights} {guest.registered.toString()}</li>
        ))}
      </ul>
    </ div>
  );
}

export default App;
