import MovieIcon from "@/assets/svg/MovieZ_Icon";
import Email from "@/assets/svg/EmailIcon";
export default function Footer() {
  return (
    <>
      <div className=" flex justify-between w-[1280px]">
        <div className=" flex flex-col justify-start">
          <a href="#" className="justify-center items-center flex gap-[10px]">
            <MovieIcon />
            Movie Z
          </a>
          <div>
            <p>© 2024 Movie Z. All Rights Reserved.</p>
          </div>
        </div>
        <div>
          <div>
            <p>Contact Information</p>
            <div>
              <Email />
              <div>
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div>
              <Email />
              <div>
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div>
            <p>Follow us</p>
            <p>
              <span>Facebook </span>
              <span>Instagram </span>
              <span>Twitter </span>
              <span>Youtube</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
