import PlayIcon from "@/assets/svg/PlayIcon";
import { Button } from "@/components/ui/button";

export function ButtonTrailer() {
  return (
    <Button className="bg-white text-black">
      <PlayIcon/>
      {" "}
      Watch Trailer
    </Button>
  );
}
