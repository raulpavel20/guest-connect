import { TOKEN } from "@/config";

export const prepareSrc = (src: string): string => {
  return `${src}?token=${TOKEN}`;
};
