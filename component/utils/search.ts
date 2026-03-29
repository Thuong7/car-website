export function normalize(str: string) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// fuzzy nhẹ
export function fuzzyMatch(text: string, search: string) {
  let t = 0;
  let s = 0;

  while (t < text.length && s < search.length) {
    if (text[t] === search[s]) s++;
    t++;
  }

  return s === search.length;
}

export function searchList<T>(
  data: T[],
  keyword: string,
  getSearchStrings: (item: T) => string[]
) {
  const kw = normalize(keyword.trim());

  if (!kw) return [];

  return data.filter((item) => {
    const fields = getSearchStrings(item);

    return fields.some((field) => {
      const text = normalize(field);

      return text.includes(kw) || fuzzyMatch(text, kw);
    });
  });
}