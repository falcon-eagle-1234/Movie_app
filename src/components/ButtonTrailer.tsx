import PlayIcon from "@/assets/svg/PlayIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type trailer = {
  trailerID: string;
};
const movieApiKey = "db430a8098715f8fab36009f57dff9fb";

export function ButtonTrailer(trailerID: trailer) {
  console.log(trailerID);

  const [trailerKey, setTrailerKey] = useState([]);

  const movieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${trailerID.trailerID}/videos?language=en-US&api_key=${movieApiKey}`
      );
      const result = await response.json();
      const movies = result.results;
      const trailerKeys = movies[0].key;

      // console.log(trailerKeys);
      setTrailerKey(trailerKeys);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(trailerKey);
  

  useEffect(() => {
    movieTrailer();
  }, []);

  

  return (
    <>
    
      <Dialog>
        <DialogTrigger>
        <div className="bg-white flex text-black items-center gap-[10px] px-3 py-2 rounded-md">
        <PlayIcon /> Watch Trailer
      </div>
        </DialogTrigger>
        <DialogContent className="w-fit max-w-screen">
        

          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          {/* <ReactPlayer  url={`https://www.youtube.com/watch?v=${trailerKey}`} /> */}
          <iframe className="w-[1000px] h-[500px]" src={`https://www.youtube.com/embed/${trailerKey}`} allowFullScreen ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
}
