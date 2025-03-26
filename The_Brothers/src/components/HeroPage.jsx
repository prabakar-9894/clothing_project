import CarouselDiv from 'react-bootstrap/Carousel';
import '/css/HeroPage.css'
import { useContext } from 'react';
import { ShopContext } from '../App';


function HeroPage() {
  const { HerobannerCollection } = useContext(ShopContext);
  return (
    <>
    <CarouselDiv>
      { HerobannerCollection.map((heroOneBanner)=>(
        <CarouselDiv.Item key={heroOneBanner._id}>
          <img src={`${import.meta.env.VITE_BACKEND_URL}${heroOneBanner.img}`} alt="Image 1" />
        </CarouselDiv.Item>
      ))
      }
    </CarouselDiv>
    </>
    
  );
}

export default HeroPage;


