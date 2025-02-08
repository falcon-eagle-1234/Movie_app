"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@/assets/svg/star-icon";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type movieType = {
  vote_average: string;
  id: number;
  poster_path: string;
  original_title: string;
};

export default function MovieHome() {
  const [movieType, setMovieType] = useState<movieType[]>([]);
  const [pageNumber, setPageNumber] = useState(1)
  const params = useParams();
  console.log(params.home);
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

  const onclickHandle = (e: number) => {
    let page_number = 1;
     page_number = page_number + e;
     console.log(page_number);
     
     setPageNumber(page_number)
   }
console.log(pageNumber);


  const movieApi = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.home}?language=en-US&page=${pageNumber}&api_key=${movieApiKey}`
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
                  <div className="rounded-b-lg bg-[#e5e7eb] p-4">
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
          <div  >
            <Pagination >
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => onclickHandle(0)} href="">{pageNumber}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => onclickHandle(1)} href="#">{pageNumber + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => onclickHandle(2)} href="#">{pageNumber + 2}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
