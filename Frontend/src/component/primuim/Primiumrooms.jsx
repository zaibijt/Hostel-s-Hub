import React from 'react';

const RoomItem = ({ price, title, link, people, size, view, galleryImages, imageSrc, imageAlt }) => {
  return (
    <div className="six columns">
      <div className="gdlr-item gdlr-room-item gdlr-room-image">
        <div className="gdlr-ux gdlr-room-image-ux">
          <div className="gdlr-room-thumbnail-wrap">
            <div className="gdlr-room-thumbnail-inner">
              <div className="gdlr-thumbnail-gallery">
                <a href="#" data-fc-gallery={JSON.stringify(galleryImages)}>
                  <img src={imageSrc} alt={imageAlt} width="790" height="700" />
                  <div className="gdlr-thumbnail-gallery-overlay"></div>
                  <div className="gdlr-thumbnail-gallery-label gdlr-title-font">
                    <i className="fa fa-image"></i>View Gallery
                  </div>
                </a>
              </div>
            </div>
            <div className="gdlr-room-thumbnail-overlay">
              <div className="gdlr-room-title-wrap">
                <div className="gdlr-room-image-top-info">From {price}</div>
                <h3 className="gdlr-room-title">
                  <a href={link}>{title}</a>
                </h3>
                <div className="gdlr-room-image-bottom-info">
                  {people} People {size} sqm. {view}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomList = () => {
  return (
    <>
      <RoomItem
        price="$125"
        title="Superior Room – One King Bed"
        link="https://demo.goodlayers.com/hotelmaster/main4/room/superior-room-one-king-bed/"
        people="3"
        size="41"
        view="Ocean View"
        galleryImages={[
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_416987854.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_715249594.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/kelsey-roenau-608583-unsplash.jpg" },
        ]}
        imageSrc="../../../../goodlayers.b-cdn.net/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_416987854-790x700.jpg"
        imageAlt=""
      />
      <div className="clear"></div>
      <RoomItem
        price="$120"
        title="Superior Room – Two Double Beds"
        link="https://demo.goodlayers.com/hotelmaster/main4/room/superior-room-two-double-beds/"
        people="3"
        size="41"
        view="Ocean View"
        galleryImages={[
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_419147299.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_715249594.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/kelsey-roenau-608583-unsplash.jpg" },
        ]}
        imageSrc="../../../../goodlayers.b-cdn.net/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_419147299-790x700.jpg"
        imageAlt=""
      />
      <div className="clear"></div>
      <RoomItem
        price="$180"
        title="Deluxe King Room"
        link="https://demo.goodlayers.com/hotelmaster/main4/room/deluxe-king-room/"
        people="3"
        size="45"
        view="Ocean View"
        galleryImages={[
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/ialicante-mediterranean-homes-475803-unsplash.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/kelsey-roenau-608583-unsplash.jpg" },
        ]}
        imageSrc="../../../../goodlayers.b-cdn.net/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/ialicante-mediterranean-homes-475803-unsplash-790x700.jpg"
        imageAlt=""
      />
      <div className="clear"></div>
      <RoomItem
        price="$109"
        title="Premium Room – King Bed"
        link="https://demo.goodlayers.com/hotelmaster/main4/room/premium-room-king-bed/"
        people="3"
        size="41"
        view="Ocean View"
        galleryImages={[
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/chastity-cortijo-604624-unsplash.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/shutterstock_307470824.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/08/shutterstock_715249594.jpg" },
          { href: "https://demo.goodlayers.com/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/ingrid-hofstra-530078-unsplash-1.jpg" },
        ]}
        imageSrc="../../../../goodlayers.b-cdn.net/hotelmaster/main4/wp-content/uploads/sites/4/2019/07/chastity-cortijo-604624-unsplash-790x700.jpg"
        imageAlt=""
      />
      <div className="clear"></div>
    </>
  );
};

export default RoomList;
