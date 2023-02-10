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
import Countdown from './components/Countdown/Countdown';
import { Artists } from './components/Artists/Artists';
import { Container } from 'react-bootstrap';
import { MainHeader } from './components/MainHeader/MainHeader';

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
    <Container className='main-container'>
      <img width="100%" src="banner.webp" alt="banner" />
      <Container>
        <MainHeader />
        <div>
          <Countdown countDownDate={new Date("Jun 11, 2023 16:00:00").getTime()} />
        </div>
        <MainCarousel />
        <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          {renderTab()}
        </div>

        <div className='parallax mt-4'>
          <div className='parallax-container'>
            <div className='parallax-header'>За Нас</div>
            <div className='parallax-text'>
              Известен факт е, че читателя обръща внимание на съдържанието, което чете,
              а не на оформлението му. Свойството на Lorem Ipsum е, че до голяма степен има нормално разпределенато
              "Това е съдържание, това е съдържание". Много системи за публикуване и редактори на Уеб страници използват
              Lorem Ipsum като примерен текстов модел "по подразбиране", поради което при търсене на фразата "lorem ipsum"
              в Интернет ще бъдат открити много сайтове в процес на разработка. Някой от тези сайтове биват променяни с времето,
              а други по случайност или нарочно(за забавление и пр.) биват оставяни в този си незавършен вид.
            </div>

          </div>
        </div>
        <Artists />
        <h2 className='form-header'>За местоположението !</h2>

        <h2 className='form-header'>Програма ?</h2>
        <GuestsList guests={guests} />

        <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          <hr></hr>
          <h1>
            Admin Panel
          </h1>
          <AddGuest handleGuests={handleGuests} />
        </div>
      </Container>


      <footer></footer>
    </ Container>
  );
}

export default App;
