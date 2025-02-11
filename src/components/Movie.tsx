import RightChevron from "@/assets/RightChevron";
import { useState } from "react";
import { useEffect } from "react";
import { StarIcon } from "@/assets/svg/star-icon";
import { title } from "process";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Movie = {
  id: string;
  poster_path: string;
  vote_average: number;
  original_title: string;
};

type props = {
  title: string;
  movieName: string;
};

type element = {
  e: object;
};
const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

export default function Movie(props: props) {
  const [Movie, setMovieData] = useState<Movie[]>([]);
  const router = useRouter();
  const MovieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.movieName}?language=en-US&page=1&api_key=${movieApiKey}`
      );
      const result = await response.json();
      const Movies = result.results;
      setMovieData(Movies);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(Movie);

  const onclickHandle = () => {
    const category = props.movieName
    router.push(`movie/${category}`);
  };

  useEffect(() => {
    MovieData();
  }, []);
  return (
    <>
      <div className="flex justify-center py-[52px]">
        <div className="w-[1280px]">
          <div className="flex justify-between">
            <p className="text-[24px] font-bold">{props.title}</p>
            <p onClick={() => onclickHandle()} className="flex font-bold items-center gap-[10px] text-[14px]">
              See more <RightChevron />
            </p>
          </div>
          <div className="grid grid-flow-col grid-rows-2 gap-[20px] mt-6">
            {Movie.slice(0, 10).map((movie, index) => (
              <Link key={`poster-img${index}`} href={`detail/${movie.id}`}>
                <div className="w-full">
                  <img
                    className="w-full h-[340px] object-cover rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt=""
                  />
                  <div className="rounded-b-lg bg-[#e5e7eb] bg-secondary p-4">
                    <p className="flex items-center gap-[5px]">
                      <StarIcon />
                      {movie.vote_average.toFixed(1)}
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
        </div>
      </div>
    </>
  );
}
