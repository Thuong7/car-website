"use client";

import { Section } from "@/component/types";

type Data = Extract<
  Section,
  { type: "featureVersions" }
>["data"];

type Props = {
  data: Data;
  onChange: (data: Data) => void;
};

export default function FeatureVersionsBlock({
  data,
  onChange,
}: Props) {
  const updateVersion = (index: number, newItem: any) => {
    const list = [...data.versions];
    list[index] = newItem;
    onChange({ versions: list });
  };

  const addVersion = () => {
    onChange({
      versions: [
        ...data.versions,
        { title: "", content: "", features: [] },
      ],
    });
  };

  const removeVersion = (index: number) => {
    onChange({
      versions: data.versions.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <h3>Feature Versions</h3>

      {data.versions.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <input
            placeholder="Title"
            value={item.title}
            onChange={(e) =>
              updateVersion(i, {
                ...item,
                title: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Content"
            value={item.content ?? ""}
            onChange={(e) =>
              updateVersion(i, {
                ...item,
                content: e.target.value,
              })
            }
          />

          <h4>Features</h4>

          {item.features.map((f: string, idx: number) => (
            <div key={idx}>
              <input
                value={f}
                onChange={(e) => {
                  const newFeatures = [...item.features];
                  newFeatures[idx] = e.target.value;
                  updateVersion(i, {
                    ...item,
                    features: newFeatures,
                  });
                }}
              />
            </div>
          ))}

          <button
            onClick={() =>
              updateVersion(i, {
                ...item,
                features: [...item.features, ""],
              })
            }
          >
            + Add feature
          </button>

          <button onClick={() => removeVersion(i)}>
            ❌ Remove version
          </button>
        </div>
      ))}

      <button onClick={addVersion}>+ Add version</button>
    </div>
  );
}