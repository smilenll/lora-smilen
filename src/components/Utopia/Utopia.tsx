import { Carousel } from 'react-bootstrap';

export const Utopia = () => {
    const images = [0, 1, 2, 3]
    const pics = images.map(img => (
        <Carousel.Item key={img}>
            <img width="100%" src={`hotel/${img}.jpg`} alt={img.toString()} />
        </Carousel.Item>
    ))

    return (
        <>
            <h2 className='form-header'>За местоположението !</h2>
            <p className='info'>Utopia е дефиниция за съвършен свят, различен от истинския. В търсене на съвършенство, избрахме място, което всеки би описал точно с тези думи. Но по-важна е утопията, която заедно ще създадем с теб.</p>
            <Carousel>
                {pics}
            </Carousel>
        </>

    )
}