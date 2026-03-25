import { FullImage } from "@/component/types";
import styles from "./Carslug.module.css";

type Props = {
  data: FullImage;
};

export default function FullImageBlock({ data }: Props) {
  if (!data) return null; 
  return (
    <section className={styles.fullImage}>    
      <div className={styles.container}>
        <img src={data.image} alt="" />
        {data.caption && (
          <figcaption>{data.caption}</figcaption>
        )}
      </div>
    </section>
  );
}