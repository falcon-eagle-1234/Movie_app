import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { log } from "console";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type genres = {
  name: string;
  id: string;
};

export function ButtonDemo() {
  const [genres, setGenres] = useState<genres[]>([]);
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";
  const pathName = usePathname()
 
  
  const genreList = async () => {
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

  console.log(genres);
  const searchParams = useSearchParams();
  console.log();
  
  const genreID = searchParams.get("genreid")? searchParams.get("genreid")?.split(",") : [];
  const router = useRouter();
  console.log(genreID);
  
  const genrePage = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    
    if(genreID){
      // console.log(genreID[0]);
      // console.log(id.toString());
      
      
    const updatedGenres = genreID.includes(id.toString())
        ? genreID.filter((genre: string) => genre !== id.toString())
        : [...genreID, id];
    
    
        params.set("genreid", updatedGenres.join(","));
        router.push(`/genres?${params}`);
    }
  
    
  
    
  };


  

  useEffect(() => {
    genreList();
    
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex border rounded-md px-4 py-2 text-sm items-center h-9 gap-1">
          <ChevronDown size={16} />
          <p>Genres</p>
        </div>
      </DropdownMenuTrigger>
      <div className="">
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>
            <p className="text-2xl">Genres</p>
            <p className="">See lists of movies by genre</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex  grid-cols-4 grid">
            {genres.map((genre, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => genrePage(genre.id)}
                className={`${genreID?.includes(genre.id.toString()) ? "bg-black text-white" : "bg-white text-black"}border rounded-r-full rounded-l-full w-fit p-1 m-1 px-2`}
              >
                {genre.name} <ChevronRight />
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
