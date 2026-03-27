"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "@/component/car/HeroSection.css";

type HeroData = {
  name: string;
  gallery: string[];
  priceList: {
    version: string;
    price: string;
  }[];
  promo: string[];
};

type Props = {
  car: HeroData;
};

export default function HeroSection({ car }: Props) {
  // ===== STATE =====
  const gallery = car.gallery || [];
  const [index, setIndex] = useState(0);
  const [mainImage, setMainImage] = useState(
    gallery[0] || "/no-image.png"
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ===== LOCK SCROLL (GIỮ NGUYÊN) =====
  useEffect(() => {
    if (!lightboxOpen) return;

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
  }, [lightboxOpen]);

  // ===== SLIDER =====
  const ITEM_WIDTH = 100;
  const GAP = 15;
  const STEP = ITEM_WIDTH + GAP;
  const VISIBLE_WIDTH = 560;

  const totalWidth =
    gallery.length * ITEM_WIDTH +
    (gallery.length - 1) * GAP;

  const centerOffset = VISIBLE_WIDTH / 2 - ITEM_WIDTH / 2;
  const maxTranslate = totalWidth - VISIBLE_WIDTH;

  let translate = index * STEP - centerOffset;
  if (translate < 0) translate = 0;
  if (translate > maxTranslate) translate = maxTranslate;

  // ===== DRAG SLIDER =====
  let startX = 0;
  let isDragging = false;

  const handleStart = (clientX: number) => {
    startX = clientX;
    isDragging = true;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const diff = startX - clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        const newIndex = Math.min(index + 1, gallery.length - 1);
        setIndex(newIndex);
        setMainImage(gallery[newIndex]);
      } else {
        const newIndex = Math.max(index - 1, 0);
        setIndex(newIndex);
        setMainImage(gallery[newIndex]);
      }
      isDragging = false;
    }
  };

  const handleEnd = () => {
    isDragging = false;
  };

  // ===== ZOOM =====
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(scale + e.deltaY * -0.001, 1), 4);
    setScale(newScale);
  };

  let start = { x: 0, y: 0 };
  let dragging = false;

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging = true;
    start = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => {
    dragging = false;
  };

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <section className="hero">
      <h1 className="sr-only">{car.name}</h1>

      <div className="hero-wrapper">

        {/* LEFT */}
        <div className="hero-left">

          <div className="image-wrapper">
            <Image
              src={mainImage}
              alt={`Xe ${car.name}`}
              width={600}
              height={400}
              priority
              onClick={() => setLightboxOpen(true)}
            />

            <button
              className="zoom-btn"
              onClick={() => setLightboxOpen(true)}
            >
              ⛶
            </button>
          </div>

          <div
            className="gallery-container"
            style={{ ["--translate" as any]: `${translate}px` }}
          >
            <button
              className="nav prev"
              onClick={() => {
                const newIndex = Math.max(index - 1, 0);
                setIndex(newIndex);
                setMainImage(gallery[newIndex]);
              }}
            >
              ‹
            </button>

            <div
              className="gallery"
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={handleEnd}
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              <div className="gallery-track">
                {gallery.map((img: string, i: number) => (
                  <Image
                    key={i}
                    src={img}
                    alt=""
                    width={100}
                    height={70}
                    onClick={() => {
                      setIndex(i);
                      setMainImage(img);
                    }}
                    className={index === i ? "active" : ""}
                  />
                ))}
              </div>
            </div>

            <button
              className="nav next"
              onClick={() => {
                const newIndex = Math.min(
                  index + 1,
                  gallery.length - 1
                );
                setIndex(newIndex);
                setMainImage(gallery[newIndex]);
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* RIGHT (GIỮ NGUYÊN ICON 100%) */}
        <div className="hero-right">
          <h2>{car.name}</h2>
          <h3>BẢNG GIÁ XE {car.name}</h3>

          <ul>
            {car.priceList.map((item, i) => (
              <li key={i}>
                {item.version}: <b>{item.price}</b>
              </li>
            ))}
          </ul>

          <div className="promo">
            {car.promo.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="social-share">
            <a href="#"><svg viewBox="0 0 640 640" fill="currentColor">
              <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"/>
                </svg></a>
            <a href="#"><svg viewBox="0 0 640 640" fill="currentColor">
              <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103l0-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/>
                </svg></a>
            <a href="#"><svg viewBox="0 0 640 640" fill="currentColor">
              <path d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"/>
                </svg></a>
            <a href="#"><svg viewBox="0 0 640 640" fill="currentColor">
                  <path d="M204 6.5c-102.6 0-204 68.4-204 179.1 0 70.4 39.6 110.4 63.6 110.4 9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8 0-99.3-85.8-164.1-180-164.1z"/>
                </svg></a>
            <a href="#"><svg viewBox="0 0 640 640" fill="currentColor">
              <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"/>
                </svg></a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX giữ nguyên */}
      {lightboxOpen && (
        <div className="lightbox">
          <button
            className="close"
            onClick={() => {
              setLightboxOpen(false);
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
          >
            ✕
          </button>

          <button
            className="nav prev"
            onClick={() => {
              const newIndex = Math.max(index - 1, 0);
              setIndex(newIndex);
              setMainImage(gallery[newIndex]);
            }}
          >
            ‹
          </button>

          <div
            className="zoom-wrapper"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
          >
            <img
              src={mainImage}
              alt={`Xe ${car.name}`}
              className="zoom-img"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            />
          </div>

          <button
            className="nav next"
            onClick={() => {
              const newIndex = Math.min(
                index + 1,
                gallery.length - 1
              );
              setIndex(newIndex);
              setMainImage(gallery[newIndex]);
            }}
          >
            ›
          </button>

          <div className="counter">
            {index + 1} / {gallery.length}
          </div>
        </div>
      )}
    </section>
  );
}