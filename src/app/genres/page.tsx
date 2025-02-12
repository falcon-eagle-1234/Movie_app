"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { log } from "console";

type genres = {
  name: string;
  id: number;
};
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Genres() {
  const [genres, setGenres] = useState<genres[]>([]);
  const {genreid} = useParams()
  console.log({genreid});
  const [genreID, setGenreID] = useState<number[]>([])
  const [movieGenre, setMovieGenre] = useState<Movie[]>([])
   
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  const genreList = async () => {
    // if (genreID.length === 0) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${movieApiKey}`
      );

      const result = await response.json();
      const genres = result.genres;
      console.log(genres);
      setGenres(genres);
    } catch (error) {
      console.log(error);
    }
  };



  const genreMovieAll = async () => {
    if (genreID.length === 0) return;
    try {
      const response =  await fetch(`https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID.join(",")}&page=1&api_key=${movieApiKey}`)
      const result = await response.json();
      const genreUptate = result.results;
      setMovieGenre(genreUptate)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  console.log(movieGenre);
  

  const handleGenreAdd = (id: number) => {
    setGenreID((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  console.log(genreID.join(","));
  console.log(genreID);


  useEffect(() => {
    genreList();
    genreMovieAll();
  }, [genreID]);
  
  // useEffect(() => {
  //   if (genreid) {
  //     setGenreID([Number(genreid)]);
  //   }
  // }, [genreid]);
  return (
    <>
      <Header />
      <div className="flex justify-center">

        <div className="w-[1280px] flex">
          <div className="w-1/3 gap-[32px] flex flex-col">
            <p className="text-[26px] font-bold">Search filter</p>
            <div>
              <div className=" flex flex-col gap-[20px]">
                <div>
                  <p className="text-[18px] font-bold">Genres</p>
                  <p>See lists of movies by genre</p>
                </div>
                <div className="flex  grid-cols-3 border-r-[2px] border-solid grid">
                  {genres.map((genre, index) => (
                    
                      <p key={index} onClick={() => handleGenreAdd(genre.id)} className=" border gap-10px w-fit py-1 px-2 my-[5px] rounded-l-full  rounded-r-full flex items-center gap-1 text-[12px] font-bold">

                        {genre.name}
                        <ChevronRight size={12} />
                      </p>
                    
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-2/3 p-3">
            <h2 className="text-xl font-bold mb-4">Movies</h2>
            <div className="grid grid-cols-4 gap-4">
              {movieGenre.map((movie) => (
                <Link key={`genredetail${movie.id}`}  href={`/detail/${movie.id}`}>
                <div key={movie.id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">{movie.title}</p>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
