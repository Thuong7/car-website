"use client";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { cars } from "@/component/data";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";
import FormPopup from "./FormModal";
import { usePathname } from "next/navigation";
import { useSearch } from "@/component/utils/useSearch";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { keyword, setKeyword, result } = useSearch(
    cars,
    (car) => [car.name, car.slug]
  );

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

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
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          searchRef.current &&
          !searchRef.current.contains(e.target as Node)
        ) {
          setOpenSearch(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
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
              <Link href="/">
              <Image
                src="/main-logo.svg"
                alt="Mitsubishi Đà Nẵng - Đại lý xe Mitsubishi chính hãng"
                width={120}
                height={40}
                className="logo"
              />
            </Link>
            </div>

            <div className="mobile-right">
              <div ref={searchRef} className={`search-expand ${openSearch ? "active" : ""}`}>
                <Search onClick={() => setOpenSearch(true)} />

                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm..."
                />

                {openSearch && keyword && result.length > 0 && (
                  <div className="search-result">
                    {result.slice(0, 5).map((car) => (
                      <Link key={car.id} href={`/car/${car.slug}`}>
                        <div className="search-item">
                          <img src={car.image} className="search-thumb" />
                          <div className="search-info">
                            <h4>{car.name}</h4>
                            <p>Xe</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP */}
            <div className="left">
              <Link href="/" className="logo-link">
                <Image
                  src="/main-logo.svg"
                  alt="Mitsubishi Đà Nẵng - Đại lý xe Mitsubishi chính hãng"
                  width={120}
                  height={40}
                  className="logo"
                />
              </Link>
              <div className="info">
                <p>MITSUBISHI SAVICO ĐÀ NẴNG</p>
                <a
                  href="https://maps.google.com/?q=02 Nguyễn Hữu Thọ Đà Nẵng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  02 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng
                </a>
              </div>
            </div>

            <div className="right">
              <Menu onClick={() => { setOpenSidebar(true); setOpen(true); }} />

              <div ref={searchRef} className={`search-expand ${openSearch ? "active" : ""}`}>
                <Search onClick={() => setOpenSearch(true)} />

                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm..."
                />

                {openSearch && keyword && result.length > 0 && (
                  <div className="search-result">
                    {result.slice(0, 5).map((car) => (
                      <Link key={car.id} href={`/car/${car.slug}`}>
                        <div className="search-item">
                          <img src={car.image} className="search-thumb" />
                          <div className="search-info">
                            <h4>{car.name}</h4>
                            <p>Xe</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a href="tel:0934780797" aria-label="Gọi Mitsubishi Đà Nẵng"className="hotline">
                HOTLINE: <b>0934 780 797</b>
              </a>
            </div>

          </div>
        </div>

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="container navbar-inner">
            <ul>
              <li>
                <Link href="/" className={isActive("/") ? "active" : ""}>
                  TRANG CHỦ
                </Link>
              </li>

              {cars.map((car) => (
                <li key={car.id}>
                  <Link title={`Mitsubishi ${car.name} Đà Nẵng`}
                    href={`/car/${car.slug}`}
                    aria-label={`Xem chi tiết xe ${car.name}`}
                    className={isActive(`/car/${car.slug}`) ? "active" : ""}
                  >
                    {car.name.replace("MITSUBISHI ", "")}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className="test-drive"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopup(true);
              }}
            >
              ĐĂNG KÝ LÁI THỬ
            </button>

            <FormPopup
              open={openPopup}
              onClose={() => setOpenPopup(false)}
              cars={cars}
              selectedCar={null}
              setSelectedCar={() => {}}
            />
          </div>
        </nav>
      </header>

      {/* OVERLAY */}
      {openSidebar && (
        <div
          className="overlay"
          onClick={() => {
            setOpenSidebar(false);
            setOpen(false);
          }}
        />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${openSidebar ? "active" : ""}`}>
        <div className="sidebar-header">
          <X onClick={() => { setOpenSidebar(false); setOpen(false); }} />
        </div>

        <ul className="menu">
          <li>
            <Link href="/" onClick={() => setOpenSidebar(false)}>
              TRANG CHỦ
            </Link>
          </li>

          <li className="has-sub" onClick={() => setOpenMenu(!openMenu)}>
            <div className="menu-row">
              <span>SẢN PHẨM</span>
              <span className={`arrow ${openMenu ? "rotate" : ""}`}>v</span>
            </div>
          </li>

          <ul className={`submenu ${openMenu ? "show" : ""}`}>
            {cars.map((car) => (
              <li key={car.id}>
                <Link
                  href={`/car/${car.slug}`}
                  aria-label={`Xem chi tiết xe ${car.name}`}
                  onClick={() => setOpenSidebar(false)}
                >
                  {car.name}
                </Link>
              </li>
            ))}
          </ul>

          <li><Link href="/review">TRẢI NGHIỆM KHÁCH HÀNG</Link></li>
          <li><Link href="/blog">TIN TỨC</Link></li>
          <li><Link href="/contact">LIÊN HỆ</Link></li>

          <li>
            <a href="tel:0934780797" aria-label="Gọi Mitsubishi Đà Nẵng" className="hotline">
              HOTLINE: <b>0934 780 797</b>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}