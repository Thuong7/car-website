import { Feature } from "@/component/types";
import styles from "./Carslug.module.css";

type Props = {
  features: Feature[];
};

export default function FeatureGrid({ features }: Props) {
  if (!features) return null; 

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {features.map((item, i) => (
            <div key={i} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <p style={{ whiteSpace: "pre-line" }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}