import { Carousel } from 'react-bootstrap';

export const MainCarousel = () => {
    return (
        <Carousel>
        <Carousel.Item>
          <img width="100%" src="19.jpg" alt="me" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="2.jpg" alt="1" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="3.jpg" alt="2" />
        </Carousel.Item>
      </Carousel>
    )
}