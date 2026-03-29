"use client";

import { useEffect, useMemo, useState } from "react";
import { searchList } from "./search";

export function useSearch<T>(
  data: T[],
  getSearchStrings: (item: T) => string[],
  debounceMs = 300
) {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<T[]>([]);

  const searchFn = useMemo(() => getSearchStrings, [getSearchStrings]);

  useEffect(() => {
    const t = setTimeout(() => {
      const filtered = searchList(data, keyword, searchFn);
      setResult(filtered);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [keyword, data, searchFn, debounceMs]);

  return {
    keyword,
    setKeyword,
    result,
  };
}