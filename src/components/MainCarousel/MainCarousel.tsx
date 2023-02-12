import { Carousel } from 'react-bootstrap';

export const MainCarousel = () => {
  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const pics = images.map(img => (
    <Carousel.Item key={img}>
      <img width="100%" src={`mainCarousel/${img}.jpg`} alt={img.toString()} />
    </Carousel.Item>
  ))

  return (
    <Carousel variant="dark" interval={4000}>
      {pics}
    </Carousel>
  )
}