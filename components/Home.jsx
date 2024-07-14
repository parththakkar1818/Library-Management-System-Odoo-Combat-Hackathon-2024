import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSearch } from "react-icons/md";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import {logo} from "../images/science.png"
import ScienceImage from "../images/science.png";
import MysteryImage from "../images/mystery.png";
import ScifiImage from "../images/science fiction.png";
import FantasyImage from "../images/fantasy.png";
import ThrillerImage from "../images/thriller.png";
import RomanceImage from "../images/romance.png";
import HorrorImage from "../images/horror.png";
import FictionImage from "../images/fiction.png";
const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Book 1" onDragStart={handleDragStart} role="presentation" className="carousel-img" />,
  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765" alt="Book 2" onDragStart={handleDragStart} role="presentation" className="carousel-img" />,
  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Book 3" onDragStart={handleDragStart} role="presentation" className="carousel-img" />,
  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" alt="Book 4" onDragStart={handleDragStart} role="presentation" className="carousel-img" />,
  <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353" alt="Book 5" onDragStart={handleDragStart} role="presentation" className="carousel-img" />,
];

const smallItems = [
  {
    image: ScienceImage,
    category: "Science",
    link: "/science",
  },
  {
    image: MysteryImage,
    category: "Mystery",
    link: "/mystery",
  },
  {
    image: ScifiImage,
    category: "Science Fiction",
    link: "/scifi",
  },
  {
    image: FantasyImage,
    category: "Fantasy",
    link: "/fantasy",
  },
  {
    image: ThrillerImage,
    category: "Thriller",
    link: "/thriller",
  },
  {
    image: RomanceImage,
    category: "Romance",
    link: "/romance",
  },
  {
    image: HorrorImage,
    category: "Horror",
    link: "/horror",
  },
  {
    image: FictionImage,
    category: "Fiction",
    link: "/fiction",
  },
];

const Home = () => {
  const handleCategoryClick = (link) => {
    // Handle category click logic here, e.g., redirect to the respective route
    console.log(`Navigating to ${link}`);
  };

  const renderSmallItems = () =>
    smallItems.map((item, index) => (
      <div key={index} className="carousel-item" onDragStart={handleDragStart}>
        <Link to={item.link}>
          <div className="relative overflow-hidden group">
            <img src={item.image} alt={item.category} className="carousel-img-small transform transition-transform duration-300 group-hover:scale-105 rounded-xl" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-75">
              <p className="text-white text-sm">{item.category}</p>
            </div>
          </div>
          <p className="text-center text-sm mt-2">{item.category}</p>
        </Link>
      </div>
    ));
    const renderBooks = (books) =>
      books.map((book, index) => (
        <div key={index} className="book-item p-4 border border-gray-200 rounded-lg shadow-md flex">
          <img src={book.image} alt={book.title} className="w-24 h-36 object-cover rounded-lg" />
          <div className="ml-4">
            <Link to={book.link} className="text-lg font-bold text-gray-800 hover:text-blue-600">{book.title}</Link>
            <p className="text-sm text-gray-600">Category : {book.category}</p>
          </div>
        </div>
      ));

  return (
    <div>
      <div className='carousel-container'>
        <AliceCarousel
          mouseTracking
          items={items}
          autoPlay
          autoPlayInterval={2000}
          infinite
          disableButtonsControls
          disableDotsControls
        />
      </div>
      <div className="mt-10 pb-1 pt-4 flex flex-col">
        <h2 className="text-lg font-bold mb-2 flex items-center justify-center">Popular Categories in Books</h2>
        <div className='carousel-container-small relative'>
          <AliceCarousel
            mouseTracking
            items={renderSmallItems()}
            autoPlay
            autoPlayInterval={2500}
            infinite
            disableDotsControls
            responsive={{
              0: { items: 1 },
              256: { items: 2 },
              512: { items: 3 },
              1024: {items:4},
            }}
            renderPrevButton={({ isDisabled, onClick }) => (
              <button
                className={`carousel-button-prev ${isDisabled ? 'disabled' : ''} absolute top-[42%] left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md`}
                onClick={onClick}
                disabled={isDisabled}
              >
                <GrFormPrevious/>
              </button>
            )}
            renderNextButton={({ isDisabled, onClick }) => (
              <button
                className={`carousel-button-next ${isDisabled ? 'disabled' : ''} absolute top-[42%] right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10`}
                onClick={onClick}
                disabled={isDisabled}
              >
                <MdNavigateNext/>
              </button>
            )}
          />
        </div>
      </div>
      <div className=' flex flex-row justify-between items-center'>
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 ml-64">New Arrivals</h2>
          <div className="grid grid-cols-1 gap-4 max-h-96 ml-60 overflow-y-auto">
            {renderBooks(smallItems)}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 mr-52">Trending Books</h2>
          <div className="grid grid-cols-1 gap-4 max-h-96 mr-60 overflow-y-auto">
            {renderBooks(smallItems)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
