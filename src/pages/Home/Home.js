import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Navbar , HotelCard , Categories , SearchStayWithDate , Filter} from "../../components/";
import "./Home.css";

import { useCategory , useDate , useFilter } from "../../context";
import { getHotelsByPrice , getHotelsByRoomsAndBeds , getHotelsByPropertyType, getHotelsByRatings , getHotelsByCancelation} from "../../utils";


export const Home = () => {

  const [hasMore , setHasMore] = useState(true);
  const [currentIndex , setCurrentIndex] = useState(16);
  const [testData , setTestData] = useState([]);
  const [hotels , setHotels] = useState([]);
  const { hotelCategory }  = useCategory();
  const { isSearchModalOpen } = useDate();
  const { isFilterModalOpen , priceRange , noOfBathrooms , noOfBedrooms , noOfBeds ,propertyType, hotelRating , isCancelable} = useFilter();
 
  useEffect(() => {
    ( async () => {
      try {
        const {data} = await axios.get(`https://breeze-travel-app.cyclic.app/api/hotels?category=${hotelCategory}`);
        // console.log(data);
        setTestData(data);
        // setHotels(data);
        setHotels(data ? data.slice(0 , 16) : []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length){
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if(hotels && hotels.length > 0){
        setHotels(hotels.concat(testData.slice(currentIndex, currentIndex + 16)));
        setCurrentIndex(prev => prev + 16)
      }
      else{
        setHotels([]);
      }
    } , 1000)
  }

  console.log({hotelRating});
  
  const filteredHotelsByPrice = getHotelsByPrice(hotels , priceRange);
  const filteredHotelsByRoomsAndBeds = getHotelsByRoomsAndBeds(filteredHotelsByPrice , noOfBathrooms , noOfBedrooms , noOfBeds);
  const filteredHotelsByPropertyType = getHotelsByPropertyType(filteredHotelsByRoomsAndBeds, propertyType);
  const filteredHotelsByRatings = getHotelsByRatings(filteredHotelsByPropertyType, hotelRating);
  const filteredHotelsByCancelation = getHotelsByCancelation(filteredHotelsByRatings, isCancelable);

  return (
    <div className="relative">
      <Navbar />
      <Categories />
        {
          hotels && hotels.length > 0 ? (
            <InfiniteScroll
              dataLength={hotels.length}
              next = {fetchMoreData}
              hasMore = {hasMore}
              loader = {hotels.length > 0 && <h3 className="alert-text">Loading....</h3>}
              endMessage = {<p className="alert-text">You have seen it all !</p>}
            >
                <main className="main d-flex align-center wrap gap-larger">
                
                  {                    
                    filteredHotelsByCancelation && filteredHotelsByCancelation.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)
                  }
                </main>
            </InfiniteScroll>
          )
          :
          (<></>)
        }    
        {
          isSearchModalOpen && <SearchStayWithDate />
        }
        {
          isFilterModalOpen && <Filter />
        }
    </div>
  )
}
