import { Description } from "@/component/types";
import styles from "./Carslug.module.css";

type Props = {
  data: Description;
};

export default function DescriptionBlock({ data }: Props) {
  if (!data) return null; 

  return (
    <section className={styles.desc}>
      <div className={styles.container}>
        <h4>{data.title}</h4>
        <h2>{data.heading}</h2>
        <p>{data.content}</p>
      </div>
    </section>
  );
}