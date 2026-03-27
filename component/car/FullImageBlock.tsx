import { FullImage } from "@/component/types";
import styles from "./Carslug.module.css";
import Image from "next/image";

type Props = {
  data: FullImage;
};

export default function FullImageBlock({ data }: Props) {
  if (!data) return null;

  return (
    <section className={styles.fullImage}>
      <div className={styles.container}>
        <Image
          src={data.image}
          alt={data.caption || "car image"}
          width={1200}
          height={600}
        />

        {data.caption && (
          <figcaption style={{ whiteSpace: "pre-line" }}>
            {data.caption}
          </figcaption>
        )}
      </div>
    </section>
  );
}