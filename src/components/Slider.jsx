// Images
import banner01 from "../assets/images/banner-01.jpg";
import banner02 from "../assets/images/banner-02.jpg";
import banner03 from "../assets/images/banner-03.jpg";

const Slider = () => {
  return (
    <div>
      <swiper-container
        class="mySwiper"
        pagination="true"
        pagination-clickable="true"
        navigation="true"
        space-between="30"
        centered-slides="true"
        autoplay-delay="2500"
        autoplay-disable-on-interaction="false"
      >
        <swiper-slide>
          <div className="relative">
            <img
              src={banner01}
              alt="Banner Image"
              className="w-full max-h-[500px]"
            />
            <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl sm:text-2xl md:text-3xl font-bold font-lato p-4 text-center bg-black/50 text-white">
              Discover Your Dream Home Today!
            </h3>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="relative">
            <img
              src={banner02}
              alt="Banner Image"
              className="w-full max-h-[500px]"
            />
            <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl sm:text-2xl md:text-3xl font-bold font-lato p-4 text-center bg-black/50 text-white">
              Luxury Living Awaits: Find Your Perfect Retreat
            </h3>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="relative">
            <img
              src={banner03}
              alt="Banner Image"
              className="w-full max-h-[500px]"
            />
            <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl sm:text-2xl md:text-3xl font-bold font-lato p-4 text-center bg-black/50 text-white">
              Unlock Your Next Adventure: Explore Our Exclusive Properties
            </h3>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
};

export default Slider;
