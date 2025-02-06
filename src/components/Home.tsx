"use client";
import { InputDemo } from "./Input";
import { ButtonDemo } from "./Button";
import { CarouselDemo } from "./Carousel";
import MovieIcon from "@/assets/svg/MovieZ_Icon";
import Footer from "./Footer";
import UpcomingMovie from "./Movie";



export default function HomePage() {
  return (
    <>
      <div>
        <header className="flex justify-center py-4">
          <div className="flex w-[1280px] h-[36px] justify-between ">
            <a href="#" className="justify-center items-center flex gap-[10px]">
              <MovieIcon />
              Movie Z
            </a>
            <div className="flex gap-[20px]">
              <ButtonDemo />
              <InputDemo />
            </div>
            <button className="w-[36px] h-[36px] flex justify-center items-center rounded-lg border-solid border-[#E4E4E7] border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
        </header>
        <CarouselDemo />
        <UpcomingMovie movieName="upcoming" title="Upcoming"/>
        <UpcomingMovie movieName="popular" title="Popular"/>
        <UpcomingMovie movieName="top_rated" title="Top Rated"/>
        <div className="flex  justify-center py-[40px] bg-[#4338CA] text-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
