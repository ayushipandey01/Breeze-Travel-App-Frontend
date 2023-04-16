import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FinalPrice, HotelDetails, HotelImages, Navbar } from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {

  const { id } = useParams();

  const [ singleHotel , setSingleHotel] = useState([]);
  
  useEffect(() => {
    ( async () => {
      try {
        const {data} = await axios.get(`https://breeze-travel-app.cyclic.app/api/hotels/${id}`);
        setSingleHotel(data);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [id]);
  
  const { name, country } = singleHotel;

  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {name}, {country}
        </p>
        <HotelImages singleHotel = {singleHotel}/>
        <div className="d-flex">
          <HotelDetails singleHotel = {singleHotel}/>
          <FinalPrice />
        </div>
      </main>
    </Fragment>
  )
}