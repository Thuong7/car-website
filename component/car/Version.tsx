import { FeatureVersions } from "@/component/types";
import styles from "./Carslug.module.css";
type Props = {
  data: FeatureVersions;
};

export default function FeatureVersionsView({ data }: Props) {
  if (!data?.versions?.length) return null;

  return (
    <section className={styles.fvWrapper}>
      <div className={styles.fvGrid}>
        {data.versions.map((item, i) => (
          <div key={i} className={styles.fvCard}>
            {item.image && (
              <img
                src={item.image}
                className={styles.fvImage}
              />
            )}

            <h3 className={styles.fvTitle}>
              {item.title}
            </h3>

            <p className={styles.fvContent}>
              {item.content}
            </p>

            <h4 className={styles.fvSub}>
              Trang thiết bị
            </h4>

            <ul className={styles.fvList}>
              {item.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}