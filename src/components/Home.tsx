"use client";
import { InputDemo } from "./Input";
import { ButtonDemo } from "./ButtonGenre";
import { CarouselDemo } from "./Carousel";
import MovieIcon from "@/assets/svg/MovieZ_Icon";
import Footer from "./Footer";
import Movie from "./Movie";
import Header from "./Header";

export default function HomePage() {
  return (
    <>
      <div>
        <Header />
        <CarouselDemo />
        <Movie movieName="upcoming" title="Upcoming" />
        <Movie movieName="popular" title="Popular" />
        <Movie movieName="top_rated" title="Top Rated" />
        <Footer />
      </div>
    </>
  );
}
