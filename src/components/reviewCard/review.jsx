import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-coverflow";

// API service import
import { getPublishedTestimonials } from "../../features/admin/testimonials/AllPublishedTestimonials";

// Skeleton Component
function ReviewSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between h-80 rounded-xl bg-white p-6 shadow-lg animate-pulse">
      <div className="w-full flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex items-center gap-3 mt-2 w-full">
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        <div className="text-left space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ item }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const avatarUrl = `${API_BASE_URL}${item.avatar}`;

  return (
    <div className="flex flex-col items-center justify-between h-80 rounded-xl bg-white p-6 shadow-lg">
      <p className="text-gray-600 text-center relative flex-1">{item.review}</p>
      <div className="flex items-center gap-3 mt-2">
        <img
          src={avatarUrl}
          alt={item.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="text-left">
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <div className="flex text-yellow-500">
            {Array.from({ length: item.rating }, (_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swiperKey, setSwiperKey] = useState(0); // Key to force re-render Swiper

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getPublishedTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError("Could not load testimonials at the moment.");
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setIsLoading(false);
        // Force Swiper to reinitialize after data loads
        setSwiperKey((prev) => prev + 1);
      }
    };

    fetchTestimonials();
  }, []);

  // Show skeletons while loading
  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Swiper
            key={`skeleton-${swiperKey}`}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 250,
              modifier: 1.5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <SwiperSlide key={i} className="max-w-xs rounded-xl !w-[320px]">
                <ReviewSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  // Handle no data state
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="text-center text-gray-500">
          No testimonials available yet.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          key={`data-${swiperKey}`}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id} className="max-w-xs rounded-xl !w-[320px]">
              <ReviewCard item={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
