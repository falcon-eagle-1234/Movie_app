"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@/assets/svg/star-icon";
import { PaginationDemo } from "@/components/Paginations";


type movieType = {
  vote_average: string;
  id: number;
  poster_path: string;
  original_title: string;
};
type props = {
  pagenumber: number;
}

export default function MovieHome(pageNumber: number) {
  const [movieType, setMovieType] = useState<movieType[]>([]);
  
  const params = useParams();
  console.log(params.home);
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";




  const movieApi = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.home}?language=en-US&page=5&api_key=${movieApiKey}`
      );
      const result = await response.json();
      const results = result.results;
      console.log(results);
      setMovieType(results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movieType);




  useEffect(() => {
    movieApi();

  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center py-[52px]">
        <div className="w-[1280px]">
          <p className="text-[24px] font-bold">{params.home}</p>
          <div className="grid grid-flow-col grid-rows-4 gap-[20px] mt-6">
            {movieType.map((movie, index) => (
              <Link key={`poster-img${index}`} href={`/detail/${movie.id}`}>
                <div className="w-full">
                  <img
                    className="w-full h-[340px] object-cover rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt=""
                  />
                  <div className="rounded-b-lg bg-secondary bg-[#e5e7eb] p-4">
                    <p className="flex items-center gap-[5px]">
                      <StarIcon />
                      {movie.vote_average}
                      <span className="text-xs text-[#71717A]">/10</span>
                    </p>
                    <p className="text-xl py-2 text-wrap">
                      {movie.original_title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <PaginationDemo/>
        </div>
      </div>

      <Footer />
    </>
  );
}
