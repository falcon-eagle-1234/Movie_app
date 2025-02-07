import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ButtonTrailer } from "./ButtonTrailer";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { StarIcon } from "@/assets/svg/star-icon";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  backdrop_path: string;
  vote_average: number;
  original_title: string;
  overview: string;
};
type carouselKey = {
  e: number;
}
const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

export function CarouselDemo() {
  const [movie, setMovieData] = useState<Movie[]>([]);

  const router = useRouter()

  const movieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${movieApiKey}`
      );
      const result = await response.json();
      const movies = result.results;
      setMovieData(movies);
    } catch (error) {
      console.log(error);
    }
  };
const handleClick = (e:string) =>{
router.push(`detail/${e}`)
}
  useEffect(() => {
    movieData();
  }, []);

  return (
    <div className="py-[20px]">
      <Carousel>
        <CarouselContent>
          {movie.map((movies, index) => (
            <CarouselItem className="" key={`carousel-movie-${index}`}>
              <div className="relative flex items-center" onClick={()=> handleClick(movies.id)}>
                <img
                  className="w-screen h-[500px] object-cover"
                  src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                  alt=""
                />
                <div className="text-white absolute pl-[150px]">
                  <p>Now playing:</p>
                  <p className="text-4xl py-2">{movies.original_title}</p>
                  <p className="flex items-center gap-[5px]">
                    <StarIcon />
                    {movies.vote_average}<span className="text-xs text-[#71717A]">/10</span>
                  </p>
                  <p className="w-[300px] h-[100px] overflow-hidden my-4">
                    {movies.overview}
                  </p>
                  <ButtonTrailer />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
