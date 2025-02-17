"use client";
import { StarIcon } from "@/assets/svg/star-icon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSearchedMovies } from "@/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type genres = {
  name: string;
  id: string;
};
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function SearchPage() {
  const [genres, setGenres] = useState<genres[]>([]);
  const router = useRouter();

  // const [genreID, setGenreID] = useState<number[]>([])
  const [movieGenre, setMovieGenre] = useState<Movie[]>([]);

  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  const genreList = async () => {
    // if (genreID.length === 0) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${movieApiKey}`
      );

      const result = await response.json();
      const genres = result.genres;

      setGenres(genres);
    } catch (error) {
      console.log(error);
    }
  };
  const searchParams = useSearchParams();
  const value = searchParams.get("value")
  const genreID = searchParams.get("genreid")
  ? searchParams.get("genreid")?.split(",")
  : [];
console.log(value);

  const searchMovie = async () => {
    if (value) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1&api_key=${movieApiKey}`
        );
        const result = await response.json();
        const genreUptate = result.results;
        setMovieGenre(genreUptate);
      } catch (error) {
        console.log(error);
      }
    }
  };
useEffect(() => {
    searchMovie()
  }, [searchParams]);

  useEffect(() => {
    genreList();
  }, []);

  const handleGenreAdd = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (genreID) {
      // console.log(genreID[0]);
      // console.log(id.toString());

      const updatedGenres = genreID.includes(id.toString())
        ? genreID.filter((genre: string) => genre !== id.toString())
        : [...genreID, id];

      params.set("genreid", updatedGenres.join(","));
      router.push(`/search?${params}`);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-[1280px] flex">
          

          <div className="w-2/3 p-3">
            <h2 className="text-xl font-bold mb-4">Movies</h2>
            <div className="grid grid-cols-4 gap-4">
              {movieGenre.map((movie) => (
                <Link
                  key={`genredetail${movie.id}`}
                  href={`/detail/${movie.id}`}
                >
                  <div key={movie.id} className="">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-t-lg"
                    />
                    <div className="p-3 rounded-b-lg bg-[#e5e7eb] h-[96px] bg-secondary">
                      <p className="flex items-center  gap-[5px] text-sm">
                        <StarIcon />
                        {movie.vote_average.toFixed(1)}
                        <span className="text-xs text-[#71717A] ">/10</span>
                      </p>
                      <p className="text-sm font-medium font-bold mt-2">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-1/3 gap-[32px] flex flex-col ml-4 ">
            
            <div>
              <div className=" flex flex-col gap-[20px]">
                <div className="pl-3">
                  <p className="text-[18px] font-bold">Search by genre</p>
                  <p>See lists of movies by genre</p>
                </div>
                <div className="flex  grid-cols-3 pl-3 border-l-[2px] border-solid grid">
                  {genres.map((genre, index) => (
                    <p
                      key={index}
                      onClick={() => handleGenreAdd(genre.id)}
                      className={`${
                        genreID?.includes(genre.id.toString())
                          ? "bg-black text-white"
                          : "bg-white text-black "
                      } border gap-10px w-fit py-1 px-2 my-[5px] rounded-l-full  rounded-r-full flex items-center gap-1 text-[12px] font-bold`}
                    >
                      {genre.name}
                      <ChevronRight size={12} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
