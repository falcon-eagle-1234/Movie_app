"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type genres = {
  name: string;
  id: number;
};

export default function Genres() {
  const [genres, setGenres] = useState<genres[]>([]);
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  const genreList = async () => {
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

  console.log(genres);

  useEffect(() => {
    genreList();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-[1280px]">
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
                    <Link key={index} href={`genres/${genre.id}`}>
                      <p className=" border gap-10px w-fit py-1 px-2 my-[5px] rounded-l-full  rounded-r-full flex items-center gap-1 text-[12px] font-bold">

                        {genre.name}
                        <ChevronRight size={12} />
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-2/3"></div>
        </div>
      </div>

      <Footer />
    </>
  );
}
