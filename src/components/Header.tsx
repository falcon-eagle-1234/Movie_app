import MovieIcon from "@/assets/svg/MovieZ_Icon";
import { ButtonDemo } from "./ButtonGenre";
import { InputDemo } from "./Input";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex justify-center py-4">
        <div className="flex w-[1280px] h-[36px] justify-between ">
          <Link
            href="/"
            className="justify-center items-center flex gap-[10px]"
          >
            <MovieIcon />
            Movie Z
          </Link>
          <div className="flex gap-[20px]">
            <ButtonDemo />
            <InputDemo />
          </div>
          <button className="w-[36px] h-[36px] flex justify-center items-center rounded-lg border-solid border-[#E4E4E7] border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
