"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StarIcon } from "@/assets/svg/star-icon";
import { Button } from "@/components/ui/button";
import PlayIcon from "@/assets/svg/PlayIcon";
import MoreLikeThis from "@/components/MoreLikeThis";

type DetailType = {
  original_title: string;
  release_date: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genres: {
    name: string;
  }[];
};

const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

export default function MovieID() {
  const [detailMovie, setDetailMovie] = useState<DetailType>({} as DetailType);

  const params = useParams();
  console.log(detailMovie.genres);
  console.log(params);

  

  const detailMovieIp = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.movieID}?language=en-US&api_key=${movieApiKey}`
      );
      const result = await response.json();
      setDetailMovie(result);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  };

  console.log(params.movieID);
  

  useEffect(() => {
    detailMovieIp();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-[1000px]">
          <div className=" flex justify-between">
            <div>
              <p className="text-[38px] font-bold">{detailMovie.original_title}</p>
              <div>
                <p>
                  {detailMovie.release_date} <span></span>
                </p>
              </div>
            </div>
            <p className="flex items-center gap-[5px]">
              <StarIcon />
              {detailMovie.vote_average}
              <span className="text-xs text-[#71717A]">/10</span>
            </p>
          </div>
          <div className="flex gap-[30px] h-[428px] my-[30px]">
            <img
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`}
              alt=""
            />
            <div className="relative">
              <img
                className="object-cover h-full "
                src={`https://image.tmdb.org/t/p/original${detailMovie.backdrop_path}`}
                alt=""
              />
              <div className="absolute bottom-[20px] left-[20px] flex items-center gap-[5px]">
                <Button className="bg-white rounded-full w-[40px] h-[40px] ">
                  <PlayIcon />
                </Button>
                <p className="text-white text-[20px]">Play trailer</p>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px]">
            {detailMovie.genres?.map((genreName, index) => (
              <p
                className="border border-gray rounded-l-full rounded-r-full text-[14px] px-2"
                key={`genres-key-${index}`}
              >
                {genreName.name}
              </p>
            ))}
          </div>
          <p className="py-8">{detailMovie.overview}</p>
          <MoreLikeThis key={movieApiKey} id={params.movieID}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
