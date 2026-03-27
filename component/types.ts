export type Car = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
};

export type Description = {
  title: string;
  heading: string;
  content: string;
};

export type Feature = {
  image: string;
  title: string;
};

export type FullImage = {
  image: string;
  caption?: string | null;
};

export type PriceItem = {
  version: string;
  price: string;
};

export type CarDetails = {
  name: string;
  gallery: string[];
  priceList: PriceItem[];
  promo: string[];

  description: Description;
  features: Feature[];
  fullImage: FullImage;
};
export type Section =
  | {
      type: "hero";
      data: {
        gallery: string[];
        priceList: {
          version: string;
          price: string;
        }[];
        promo: string[];
      };
    }
  | {
      type: "fullImage";
      data: {
        image: string;
        caption: string | null;
      };
    }
  | {
      type: "description";
      data: {
        title: string;
        heading: string;
        content: string | null;
      };
    }
  | {
      type: "features";
      data: {
        image: string;
        title: string | null;
      }[];
    }
    | {
      type: "gallery";
      data: {
        images: string[];
      };
    }
    | {
      type: "video";
      data: {
        title?: string;
        url?: string;
        caption?: string;
        thumbnail?: string | null;
      };
    }
    | { type: "featureVersions"; data: FeatureVersions };


export type CarDetailContent = {
  slug: string;
  name: string;
  sections: Section[];
};
export type FeatureItem = {
  title: string;
  content?: string | null;
  features: string[];
  image?: string | null;
};

export type FeatureVersions = {
  versions: FeatureItem[];
};