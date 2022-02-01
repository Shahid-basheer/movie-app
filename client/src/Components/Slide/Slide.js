import Posts from '../Posts/Posts'
import './Slide.css'
import {Carousel} from 'react-bootstrap'
const Slide = () => {
    return (
      <>
        <div className="slide" id="home">
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block slide-img"
                src="/images/kurup.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Kurup</h3>
                <p>dulqar super hit movie 2022</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block slide-img"
                src="/images/sur.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Jai bhim</h3>
                <p>Suriya thamil hit movie</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block slide-img"
                src="/images/pushpa.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Pushpa</h3>
                <p>
                  Allu arjun new released movie
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block slide-img"
                src="/images/vijay.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Bigil</h3>
                <p>
                  Super hit thamil movie of vijay 2022
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <Posts />
      </>
    );
}

export default Slide
