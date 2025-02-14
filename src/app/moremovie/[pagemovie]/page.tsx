"use client"

import RightChevron from "@/assets/RightChevron";
import { StarIcon } from "@/assets/svg/star-icon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PaginationDemo } from "@/components/Paginations";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

type MoreLikeThisMovie = {
    poster_path: string;
    vote_average: number;
    original_title: string;
    id: number;

}

export default function PageMovie(){
    const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

    const params = useParams()
        const [moreLikeMovie, setMoreLikeMovie] = useState<MoreLikeThisMovie[]>([])
    
    console.log(params);

    const moreLikeMovieFunction = async() => {
          
        try {
           const response = await fetch(`https://api.themoviedb.org/3/movie/${params.pagemovie}/similar?language=en-US&page=1&api_key=${movieApiKey}`);
           if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
           const result = await response.json();
           const MoreLike = result.results;
          
           setMoreLikeMovie(MoreLike);
           console.log(response);
           
           
           
        } catch (error) {
            console.log(error);
            
        }
    }
    console.log( moreLikeMovie);
     useEffect(()=>{
            moreLikeMovieFunction()
    },[params?.pagemovie])
    return(
        <>
        <Header />
        <div className="flex justify-center py-[52px]">
          <div className="w-[1280px]">
            <p className="text-[24px] font-bold">More like this</p>
            <div className="grid grid-flow-col grid-rows-4 gap-[20px] mt-6">
              {moreLikeMovie.map((movie, index) => (
                <Link key={`poster-img${index}`} href={`/detail/${movie.id}`}>
                  <div className="w-full">
                    <img
                      className="w-full h-[340px] object-cover rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt=""
                    />
                    <div className="rounded-b-lg bg-secondary bg-[#e5e7eb] h-[96px] p-4">
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
    )
    
} 