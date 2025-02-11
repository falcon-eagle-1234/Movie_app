
import { useEffect, useState } from "react"
import Link from "next/link";
import { StarIcon } from "@/assets/svg/star-icon";
import RightChevron from "@/assets/RightChevron";

type props = {
    id: string | string[] | undefined;
    key: string;
}

type MoreLikeThisMovie = {
    poster_path: string;
    vote_average: number;
    original_title: string;
    id: number;

}

const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
export default function MoreLikeThis(props: props){

    const [moreLikeMovie, setMoreLikeMovie] = useState<MoreLikeThisMovie[]>([])

    const moreLikeMovieFunction = async() => {
        try {
           const response = await fetch(`https://api.themoviedb.org/3/movie/${props.id}/similar?language=en-US&page=1&api_key=${movieApiKey}`);
           const result = await response.json();
           const MoreLike = result.results;
          
           setMoreLikeMovie(MoreLike);
           console.log(response);
           
           console.log(result);
           

           
        } catch (error) {
            console.log(error);
            
        }
    }
// console.log(props.key);

    console.log( moreLikeMovie);
    
    useEffect(()=>{
        moreLikeMovieFunction()
},[])
    return(
        <>
        <div className="flex justify-between">
        <p className="text-[30px] font-bold">More like this</p>
        <p className="flex gap-[10px] items-center">See more <RightChevron/></p>
        </div>
        <div className="grid grid-flow-col grid-rows-1 gap-[20px] mt-6 pb-[100px]">
            {moreLikeMovie.slice(0, 5).map((movie, index) => (
              <Link key={`poster${index}`} href={`/detail/${movie.id}`}>
                <div className="w-full">
                  <img
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt=""
                  />
                  <div className="rounded-b-lg bg-[#e5e7eb] bg-secondary p-4">
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
        </>
    )
}