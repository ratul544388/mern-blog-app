import { clsx } from "clsx";
import { format, formatDistanceToNowStrict } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const axiosError = (error) => {
  toast.error(error.response.data.error);
};

export const generateSlug = (title) => {
  return title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9& -]/g, "")
    .replace(/-+/g, "-")
    .replace(/&+/g, "and")
    .replace(/\s+/g, "-");
};

export const formatText = (text) => {
  return String(text)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDate = ({ date, type = "normal" }) => {
  if (type === "normal") {
    console.log(date)
    return format(date, 'dd MMMM yyyy');
  }

  if (type === "distance") {
    return formatDistanceToNowStrict(date);
  }

  return "Invalid type";
};
