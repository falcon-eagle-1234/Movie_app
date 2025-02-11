import MovieIcon from "@/assets/svg/MovieZ_Icon";
import { ButtonDemo } from "./ButtonGenre";
import { InputDemo } from "./Input";
import Link from "next/link";
import { Moon } from "lucide-react";
import ThemeIcon from "./ThhemeIcon";

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
            <ThemeIcon/>
          </button>
        </div>
      </header>
    </>
  );
}
