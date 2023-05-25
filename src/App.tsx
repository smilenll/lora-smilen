import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainCarousel } from './components/MainCarousel/MainCarousel';
import { RegistrationForm } from './components/RegisterForm/RegistrationForm';
import { GuestAuth } from './components/GuestAuth/GuestAuth';
import { EndRegistration } from './components/EndRegistration/EndRegistration';
import { Tabs } from './common/Tabs.enum';
import { ICurrentGuest } from './common/IGuest';
import { GuestsList } from './components/GuestsList/GuestsList';
import Countdown from './components/Countdown/Countdown';
import { Artists } from './components/Artists/Artists';
import { Container } from 'react-bootstrap';
import { MainHeader } from './components/MainHeader/MainHeader';
import { Utopia } from './components/Utopia/Utopia';
import { Comments } from './components/Comments/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Accommodation } from './components/WeddingDay/Accommodation/components/Accommodation';

function App() {
  const [currentTab, setCurrentTab] = useState(Tabs.AUTH);
  const [currentGuest, setCurrentGuest] = useState<ICurrentGuest | undefined>();

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
        <Accommodation />
        {/* <AdminPanel /> */}
        <MainCarousel />
        <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          {renderTab()}
        </div>

        <div className='parallax mt-5'>
          <div className='parallax-container'>
            <div className='parallax-header'>За Нас</div>
            <div className='parallax-text'>
              Смилен и Лора. На нас лично си ни звучи като най-логичното словосъчетание. Минаха 10 години откакто се познаваме, а приключението ни започна от едно от най-красивите места във Варна.

              От близо 2 години сме отново заедно, щастливи, влюбени и всеки ден е по-прекрасен от предишния. За това време приключенията не спряха. Обиколихме плажовете и планините на България, посетихме едни от най-красивите места в Европа и живяхме на десетки различни места.

              Време е за следващото голямо приключение. Ние и нашите родители ви каним да отпразнуваме неговото начало на 11 юни 2023.              </div>
          </div>
        </div>
        <div>
          <h3 className='form-header'>Кумове !</h3>
          <p className='info'>Запознайте се с нашите кумове, Жан и Екатерина. За нас е чест, че ще ни кумуват!</p>
          <img width="100%" style={{ borderRadius: "5px" }} src="kumove.jpg" alt="Кумове" />
        </div>

        <Artists />
        <Utopia />


        <h2 className='form-header'>Програма !</h2>
        <p className='info'>14:00 Настаняване в хотела</p>
        <p className='info'>15:30 Напитки на плажа</p>
        <p className='info'>16:30 Ритуал на плажа</p>
        <p className='info'>18:00 Начало на вечерята</p>
        <p className='info'>23:30 Парти във вътрешния бар</p>
        <Comments />
        <h2 className='form-header'>Подаръци</h2>
        <p className='info'>Все още не сме решили, но трябва да са лесни за транспортиране към USA</p>
        <h3 className='form-header'>Допълнителна информация</h3>
        <p className='info offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          <FontAwesomeIcon icon={faStar} /> Следете сайта в деня на събитието за допълнителна информация по настаняването и други детайли. <FontAwesomeIcon icon={faStar} /></p>
        <GuestsList />
      </Container>


      <footer>
        {/* <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          <img width="25%" src="footer/react.png" alt="react" />
          <img width="25%" src="footer/firebase.png" alt="react" />
          <img width="25%" src="footer/typescript.png" alt="react" />
          <img width="25%" src="footer/bootstrap.png" alt="react" />
        </div> */}
      </footer>
    </ Container>
  );
}

export default App;
