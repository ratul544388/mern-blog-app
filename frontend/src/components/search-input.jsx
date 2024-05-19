import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import fetcher from "../lib/fetcher";
import { cn } from "../lib/utils";
import Input from "./input";
import { buttonVariants } from "./ui/button";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 400);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    navigate(`/posts/search?q=${value}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (!posts.length) return;
    setOpen(true);
  };

  const { data: posts = [] } = useQuery({
    queryKey: ["searchedPosts", debouncedValue],
    queryFn: () =>
      debouncedValue ? fetcher(`/api/posts`, { q: debouncedValue }) : [],
  });


  useEffect(() => {
    setOpen(!!posts.length);
  }, [posts.length]);

  return (
    <form onSubmit={handleSubmit} className="w-full relative max-w-md">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <Search className="size-5 text-muted-foreground absolute top-1/2 -translate-y-1/2 left-3" />
        <Input
          onFocus={handleOpen}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="search"
          id="default-search"
          placeholder="Search blogs..."
          className="pl-10 pr-20"
          required
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-white absolute top-1/2 right-0.5 -translate-y-1/2 bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {open && (
        <>
          <motion.div
            variants={{
              open: { height: "auto" },
              closed: { height: 0 },
              exit: { height: 0 },
            }}
            initial="closed"
            animate="open"
            exit="exit"
            transition={{ duration: 0.1 }}
            className="absolute overflow-hidden z-20 bg-background border rounded-md shadow-md mt-2 w-full py-2"
          >
            {posts?.map(({ _id, title, slug }) => (
              <Link
                key={_id}
                to={`/posts/${slug}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-none justify-start"
                )}
                onClick={handleClose}
              >
                <Search className="size-4 min-w-4 text-muted-foreground" />
                <span className="line-clamp-1">{title}</span>
              </Link>
            ))}
          </motion.div>
          <span
            onClick={() => setOpen(false)}
            className="fixed transition-all inset-0 mt-[60px] bg-neutral-900/40 backdrop-blur-sm"
          />
        </>
      )}
    </form>
  );
};

export default SearchInput;
