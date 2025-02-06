import { useState } from "react";
import { useEffect } from "react";

type Movie = {
    id: number;
    backdrop_path: string;
    vote_average: number;
    original_title: string;
    overview: string;
  };
  const movieApiKey = "db430a8098715f8fab36009f57dff9fb";


export default function ApiMovie(){
      const [movie, setMovieData] = useState<Movie[]>([]);
      
        const movieData = async () => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${movieApiKey}`
            );
            const result = await response.json();
            const movies = result.results;
            setMovieData(movies);
          } catch (error) {
            console.log(error);
          }
        };
      
        useEffect(() => {
          movieData();
        }, []);
      
    
}