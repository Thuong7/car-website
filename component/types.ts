export type Car = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
};

export type CarDetail = {
  slug: string;
  name: string;
  heroImage: string;
  gallery: string[];
  priceList: {
    version: string;
    price: string;
  }[];
  promo: string[];
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
        content: string;
      };
    }
  | {
      type: "features";
      data: {
        image: string;
        title: string;
      }[];
    };

export type CarDetailContent = {
  slug: string;
  name: string;
  sections: Section[];
};