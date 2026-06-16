import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className=" gap-4 text-2xl hidden lg:flex">
      <a href="https://facebook.com" target="_blank" className="border border-[rgba(220,185,145,0.95)] p-1">
        <FaFacebook className="text-blue-600" />
      </a>

      <a href="https://instagram.com" target="_blank" className="border border-[rgba(220,185,145,0.95)] p-1">
        <FaInstagram className="text-pink-500" />
      </a>

      <a href="https://youtube.com" target="_blank" className="border border-[rgba(220,185,145,0.95)] p-1">
        <FaYoutube className="text-red-600" />
      </a>
    </div>
  );
}