import Carousel from "react-multi-carousel";

const Banner = () => {
  return (
    <div className="banner">
      <h3 className="text-text-color text-xl font-medium mb-6">
        Chương trình khuyến mại
      </h3>
      <Carousel
        additionalTransfrom={0}
        autoPlay
        autoPlaySpeed={3000}
        dotListClass=""
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
      >
        <img
          src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
      </Carousel>
    </div>
  );
};

export default Banner;
