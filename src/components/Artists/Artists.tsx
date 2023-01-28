import { Carousel } from 'react-bootstrap'
import './artists.css'

export const Artists = () => {
    return (
        <>
            <h3 className='form-header'>Артисти !</h3>
            <Carousel>
                <Carousel.Item>
                    <img width="100%" src="slavin.jpg" alt="me" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>Славин Славчев</h3>
                            <p className='on-pic-text'>Иии нека бъде РОК за първо място :) ОСНОВЕН ИЗПЪЛНИТЕЛ</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="yana.jpg" alt="1" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>Яна Пенева</h3>
                            <p className='on-pic-text'>Фотографът който разказва истрии с всеки кадър. Благодарим ти че ще си с нас :)</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="q.jpg" alt="2" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>Звука на Цигулката</h3>
                            <p className='on-pic-text'>Винаги има време да си затворим очите и да се потопим в мелодията на класиката</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="dlg.jpg" alt="2" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>Явката DLG</h3>
                            <p className='on-pic-text'>Най-добрия лирик в България. Все пак някой трябва да ви нахули в някакъв момент.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="q.jpg" alt="2" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>кои ли са тези двамата ?</h3>
                            <p className='on-pic-text'>Разбираме от музика, но както с всяко нещо САМО НАЩО си е най-хубаво!!!</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="q.jpg" alt="2" />
                    <Carousel.Caption>
                        <div className='on-pic-container'>
                            <h3 className='on-pic-header'>LATE GAME</h3>
                            <p className='on-pic-text'>Време е да чуем грамуфоните !</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}