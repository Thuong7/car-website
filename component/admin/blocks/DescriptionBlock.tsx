import { Section } from "@/component/types";

type DescriptionData = Extract<Section, { type: "description" }>["data"];

type Props = {
  data: DescriptionData;
  onChange: (data: DescriptionData) => void;
};

export default function DescriptionBlock({ data, onChange }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Description</h3>

      <input
        placeholder="Title..."
        value={data.title}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />

      <input
        placeholder="Heading..."
        value={data.heading}
        onChange={(e) => onChange({ ...data, heading: e.target.value })}
      />

      <textarea
        placeholder="Content..."
        value={data.content ?? ""}
        onChange={(e) =>
          onChange({
            ...data,
            content: e.target.value || null,
          })
        }
        rows={5}
      />
    </div>
  );
}