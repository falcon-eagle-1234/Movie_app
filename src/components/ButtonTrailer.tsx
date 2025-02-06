import { Button } from "@/components/ui/button";

export function ButtonTrailer() {
  return (
    <Button className="bg-white text-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.33301 2L12.6663 8L3.33301 14V2Z"
          stroke="#18181B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
      Watch Trailer
    </Button>
  );
}
