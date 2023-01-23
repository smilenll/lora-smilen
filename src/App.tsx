import { useEffect, useState } from 'react';
import './App.css';
import { AddGuest } from './components/AddGuest';
import { getGuests } from './services/dbServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainCarousel } from './components/MainCarousel';



function App() {
  const [guests, setGuests] = useState([]);
  const updateGuest = 0;

  const handleGuests = () => {
    getGuests().then((res: any) => setGuests(res))
  }

  useEffect(() => {
    handleGuests()
  }, [updateGuest])


  return (
    <div className='container'>
      <h1 className="App">
        Нашата сватба
      </h1>
      <MainCarousel />
      <div>
        Auth
      </div>
      <div>
        Guest names
      </div>
      <div>
        Registration form
      </div>
      <div>
        End Screen
      </div>
      <AddGuest handleGuests={handleGuests} />
      <div>
        Програма
      </div>
      <div>
        Artisti
      </div>
      <div>
        Нашата история
      </div>

      <ul>
        {guests.map((guest: any) => (
          <li key={guest.name + Math.random()}>{guest.name} {guest.lastname} {guest.menu} {guest.nights}</li>
        ))}
      </ul>
    </ div>
  );
}

export default App;
