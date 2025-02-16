import MovieIcon from "@/assets/svg/MovieZ_Icon";
import { ButtonDemo } from "./ButtonGenre";
import { InputDemo } from "./Input";
import Link from "next/link";
import { Moon } from "lucide-react";
import ThemeIcon from "./ThhemeIcon";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { getImgUrl, getSearchedMovies } from "@/utils";
import { StarIcon } from "@/assets/svg/star-icon";
import RightChevron from "@/assets/RightChevron";

type Movie = {
  poster_path: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  id: number;
};

export default function Header() {
  const [value, setValue] = useState("");
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  console.log("ihrlifgweibglbvlibwvibviwrbvyb", value);
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  console.log(searchMovie);

  useEffect(() => {
    getSearchedMovies(value, 1).then((response) => {
      setSearchMovie(response?.results);
    });
  }, [value]);

  const handleClick = () => setValue("")

  return (
    <>
      <header className="flex justify-center py-4 ">
        <div className="flex w-[1280px] h-[36px] justify-between ">
          <Link
            href="/"
            className="justify-center items-center flex gap-[10px]"
          >
            <MovieIcon />
            Movie Z
          </Link>
          <div className=" relative flex justify-center">
            <div className="flex gap-[20px]">
              <ButtonDemo />
              <div className="">
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search..."
                  className=" h-full  w-[300px]"
                />
              </div>
            </div>
            {value.length !== 0 && (
              <>
              <div className="w-screen flex justify-center top-[-20px] h-screen  absolute z-20" onClick={() => handleClick()}>
                {searchMovie.length !== 0 ? (
                  <div className="absolute z-40 top-16 bg-secondary rounded-xl w-[500px]   shadow-md ">
                    {searchMovie.slice(0, 5).map((searchMovie, index) => (
                      <Link
                        key={`searchMovieFive-${index}`}
                        href={`/detail/${searchMovie.id}`}
                      >
                        <div className="p-2 rounded-xl">
                          <div className="flex p-1 mt-2 border-b-2 justify-between solid">
                            <img
                              src={getImgUrl(searchMovie.poster_path)}
                              alt=""
                              className="w-[50px] h-fit object-cover rounded-sm"
                            />
                            <div className=" px-3 w-full">
                              <p className="text-sm  w-full font-bold">
                                {searchMovie.original_title}
                              </p>
                              <p className="flex items-center gap-[5px] text-sm">
                                <StarIcon />
                                {searchMovie.vote_average.toFixed(1)}
                                <span className="text-xs text-[#71717A] text-sm">
                                  /10
                                </span>
                              </p>
                              <div className="flex justify-between gap-[40px] w-full">
                                <p className="text-sm">
                                  {searchMovie.release_date.split("-")[0]}
                                </p>
                                <p className="flex items-center justify-between text-sm">
                                  see more <RightChevron />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="px-3 py-2">
                      <p>See all results for "{value}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center absolute z-40 top-16 bg-secondary rounded-xl w-[500px] h-[70px] font-bold   shadow-md ">
                    No results found.
                  </div>
                )}
                </div>
              </>
            )}
          </div>
          <button className="w-[36px] h-[36px] flex justify-center items-center rounded-lg border-solid border-[#E4E4E7] border">
            <ThemeIcon />
          </button>
        </div>
      </header>
    </>
  );
}
