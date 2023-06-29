"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/next.svg";
import {
  AiFillBulb,
  AiFillRedditCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

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
          {isLogin ? (
            <Link href="/write">새 글 작성</Link>
          ) : (
            <Link href="/member/login">로그인</Link>
          )}
        </div>
        <div>
          <AiFillRedditCircle style={{ width: 40, height: 40 }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
