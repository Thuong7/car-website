import { Section } from "@/component/types";

export type SectionWithId = Section & {
  id: string;
};

export type CarDetailAdmin = {
  name: string;
  slug: string;
  order?: number;
  sections: SectionWithId[];
};
