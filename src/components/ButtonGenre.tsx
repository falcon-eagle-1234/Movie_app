import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { log } from "console";
import { ChevronDown, ChevronRight} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

type genres = {
  name: string;
  id: number; 
}

export  function ButtonDemo() {
  const [genres, setGenres] = useState<genres[]>([])
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  const genreList = async () => {
   
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${movieApiKey}`
      );
      
      const result = await response.json();
      const genres = result.genres
      console.log(genres);
      setGenres(genres)
    } catch (error) {
      console.log(error);
    }
  };

  console.log(genres);
  

  useEffect(()=> {
    genreList()
  },[]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 text-[14px]">
        <ChevronDown size={16} />
        Genre
      </DropdownMenuTrigger>
      <div className="">
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="text-2xl">Genres</p>
          <p className="">See lists of movies by genre</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
       <div className="flex  grid-cols-4 grid">
       {genres.map((genre, index) => (
        <Link key={index} href={`genres/${genre.id}`}>
        <DropdownMenuItem >{genre.name} <ChevronRight/></DropdownMenuItem>
        </Link>
          
        ))}
       </div>
      </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
