import "./HotelDetails.css";

export const HotelDetails = ({ singleHotel }) => {
  const {
    hostName,
    hostJoinedOn,
    numberOfBeds,
    numberOfguest,
    numberOfBedrooms,
    numberOfBathrooms,
  } = singleHotel;

  return (
    <div className="hotel-details-container">
      <div className="host-details">
        <p className="host-name">
          Hosted by {hostName}, Joined on {hostJoinedOn}
        </p>
        <span className="span">
          {numberOfguest} guests. {numberOfBedrooms} bedrooms. {numberOfBeds}{" "}
          beds. {numberOfBathrooms} bathrooms
        </span>
      </div>
      <div className="key-features host-details">
        <div className="gutter-bottom-small">
          <p className="p d-flex align-center gap">
            <span className="apps material-icons-outlined">apps</span>Dedicated
            workspace
          </p>
          <span className="span">
            A common area with wifi that is well suited for working
          </span>
        </div>
        <div className="gutter-bottom-small">
          <p className="p d-flex align-center gap">
            <span className="apps material-icons-outlined">apps</span>Great
            Location
          </p>
          <span className="span">
            80% of recent guests gave the location a 5-star rating
          </span>
        </div>

        <p className="p d-flex align-center gap">
          <span className="apps material-icons-outlined">apps</span>Free
          cancellation before 7 days of booking
        </p>
      </div>
      <div className="amenities-container">
        <p className="p amenities">What this place offers</p>
        <div className="d-flex gap-xxl">
          <div className="d-flex direction-column">
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>Kitchen
            </span>
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>Free
              parking on premises
            </span>
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>
              Dedicated workspace
            </span>
          </div>
          <div className="d-flex direction-column">
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>Wifi
            </span>
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>Washing
              machine
            </span>
            <span className="span d-flex align-center gap">
              <span className="apps material-icons-outlined">apps</span>Patio or
              Balcony
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
