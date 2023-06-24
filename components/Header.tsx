import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/next.svg";
import {
  AiFillBulb,
  AiFillRedditCircle,
  AiOutlineSearch,
} from "react-icons/ai";

const Header = () => {
  return (
    <header className="header-wrapper">
      <div>
        <Link href="/">
          <Image src={Logo} width={71} height={24} alt="main logo" />
        </Link>
      </div>
      <div className="btn-wrapper">
        <div>
          <AiFillBulb style={{ width: 24, height: 24 }} />
        </div>
        <div>
          <Link href="/search">
            <AiOutlineSearch style={{ width: 18, height: 18 }} />
          </Link>
        </div>
        <div className="write-btn">
          <Link href="/write">새 글 작성</Link>
        </div>
        <div>
          <AiFillRedditCircle style={{ width: 40, height: 40 }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
