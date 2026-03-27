import { Feature } from "@/component/types";
import styles from "./Carslug.module.css";
import Image from "next/image";

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
              <Image
                src={item.image}
                alt={item.title || "feature"}
                width={300}
                height={200}
              />
              <p style={{ whiteSpace: "pre-line" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}