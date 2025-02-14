import { Input } from "@/components/ui/input";
import { useState } from "react";

export function InputDemo() {
  const [value, setValue] = useState("");
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
      className=" h-full  w-[300px]"
    />
  );
}
