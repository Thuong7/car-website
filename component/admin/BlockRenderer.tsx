import { SectionWithId } from "@/component/cms-admin";
import DescriptionBlock from "./blocks/DescriptionBlock";
import ImageBlock from "./blocks/ImageBlock";
import FeaturesBlock from "./blocks/FeaturesBlock";
import HeroBlock from "./blocks/HeroBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import VideoBlock from "./blocks/VideoBlock";
import FeatureDescription from "./blocks/featureDescription";
import "./Builder.css";
import FeatureVersionsBlock from "./blocks/featureDescription";

type Props = {
  block: SectionWithId;
  onChange: (data: any) => void;
  onDelete: () => void;
};

export default function BlockRenderer({ block, onChange, onDelete }: Props) {
  return (
    <div className="builder-block">
      <button onClick={onDelete}>❌</button>

      {block.type === "hero" && (
        <HeroBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "description" && (
        <DescriptionBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "fullImage" && (
        <ImageBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "features" && (
        <FeaturesBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "featureVersions" && (
        <FeatureVersionsBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "gallery" && (
        <GalleryBlock data={block.data} onChange={onChange} />
      )}

      {block.type === "video" && (
        <VideoBlock data={block.data} onChange={onChange} />
      )}
    </div>
  );
}