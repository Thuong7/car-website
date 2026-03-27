export function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/\s+/g, "-")            // space → -
    .replace(/[^a-z0-9-]/g, "")      // bỏ ký tự lạ
    .replace(/-+/g, "-");            // tránh --
}