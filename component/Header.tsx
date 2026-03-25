"use client";

import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { cars } from "@/component/data";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";
import FormPopup from "./FormModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  // ===== LOCK SCROLL =====
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const preventScroll = (e: Event) => e.preventDefault();

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      window.scrollTo(0, scrollY);

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="topbar">
          <div className="container topbar-inner">

            {/* MOBILE */}
            <div className="mobile-left">
              <Menu onClick={() => setOpenSidebar(true)} />
            </div>

            <div className="mobile-center">
              <Image
                src="/main-logo.svg"
                alt="Mitsubishi Logo"
                width={120}
                height={40}
                className="logo"
              />
            </div>

            <div className="mobile-right">
              <Search />
            </div>

            {/* DESKTOP */}
            <div className="left">
              <Image
                src="/main-logo.svg"
                alt="Mitsubishi Logo"
                width={120}
                height={40}
                className="logo"
              />

              <div className="info">
                <h1>MITSUBISHI SAVICO ĐÀ NẴNG</h1>
                <p>02 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng</p>
              </div>
            </div>

            <div className="right">
              <Menu onClick={() => setOpenSidebar(true)} />
              <Search />
              <a href="tel:0705222246" className="hotline">
                HOTLINE: <b>0934 780 797</b>
              </a>
            </div>

          </div>
        </div>

        <nav className="navbar">
          <div className="container navbar-inner">
            <ul>
              <li>
                <Link href="/">TRANG CHỦ</Link>
              </li>

              {cars.map((car) => (
                <li key={car.id}>
                  <Link href={`/car/${car.slug}`}>
                    {car.name.replace("MITSUBISHI ", "")}
                  </Link>
                </li>
              ))}
            </ul>

           <button
              className="test-drive"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopup(true); // 👈 đúng cái cần mở
              }}
            >
              ĐĂNG KÝ LÁI THỬ
            </button>
              <FormPopup open={openPopup} onClose={() => setOpenPopup(false)} />
          </div>
        </nav>
      </header>

      {/* OVERLAY */}
      {openSidebar && (
        <div className="overlay" onClick={() => setOpenSidebar(false)} />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${openSidebar ? "active" : ""}`}>

        <div className="sidebar-header">
          <X onClick={() => setOpenSidebar(false)} />
        </div>

        <ul className="menu">
          <li>
            <Link href="/" onClick={() => setOpenSidebar(false)}>
              TRANG CHỦ
            </Link>
          </li>

          <li
            className="has-sub"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="menu-row">
              <span>SẢN PHẨM</span>
              <span className={`arrow ${openMenu ? "rotate" : ""}`}>
                v
              </span>
            </div>
          </li>

          <ul className={`submenu ${openMenu ? "show" : ""}`}>
            {cars.map((car) => (
              <li key={car.id}>
                <Link
                  href={`/car/${car.slug}`}
                  onClick={() => setOpenSidebar(false)}
                >
                  {car.name}
                </Link>
              </li>
            ))}
          </ul>

          <li>TRẢI NGHIỆM KHÁCH HÀNG</li>
          <li>TIN TỨC</li>
          <li>LIÊN HỆ</li>

          <li>
            <a href="tel:0934780797" className="hotline">
              HOTLINE: <b>0934 780 797</b>
            </a>
          </li>
        </ul>

      </div>
    </>
  );
}