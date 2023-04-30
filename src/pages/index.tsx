import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { useRouter } from "next/router";
import { useRef, useState, useLayoutEffect } from "react";
import ResizeObserver from "react-resize-observer";
import useDebounce from "react-use/lib/useDebounce";

const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_API_KEY || "");
const SEARCH_DEBOUNCE = 500;

const fetchTrendingGifs = (offset: number) =>
  giphyFetch.trending({ offset, limit: 10 });

export const getServerSideProps = async () => {
  const { data } = await fetchTrendingGifs(0);
  return {
    props: {
      gifs: data,
    },
  };
};

export default function IndexPage({ gifs }: any) {
  // const gridRef = useRef(null);
  const router = useRouter();
  const [width, setWidth] = useState<any>(1200);

  // useLayoutEffect(() => {
  //   // setWidth((gridRef?.current && gridRef.current?.offsetWidth) || 0);
  //   setWidth(1000);
  // }, []);

  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [term, setTerm] = useState("");
  useDebounce(() => setTerm(debouncedInput), SEARCH_DEBOUNCE, [debouncedInput]);
  const fetchSearchGifs = (offset: number) =>
    giphyFetch.search(term, { offset, limit: 10 });

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          className="my-4 w-full block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-700 outline-none"
          placeholder="Search your GIF here"
          onChange={({ target: { value } }) => setDebouncedInput(value)}
          value={debouncedInput}
        />
      </div>

      <>
        {term && (
          <div className="w-full">
            <h2 className="text-2xl pb-8 pt-4 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {term.toUpperCase()} GIFs
            </h2>
            <Grid
              onGifClick={(gif, e) => {
                e.preventDefault();
                console.log(gif);
                router.push(`/view?id=${gif.id}`);
              }}
              width={width}
              columns={
                width <= 425 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 4
              }
              gutter={6}
              fetchGifs={fetchSearchGifs}
              hideAttribution={true}
              key={term}
            />
          </div>
        )}
        {!term && (
          <div className="w-full">
            <h2 className="text-2xl pb-8 pt-4 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Trending GIFs
            </h2>
            <Grid
              initialGifs={gifs}
              onGifClick={(gif, e) => {
                e.preventDefault();
                console.log(gif);
                router.push(`/view?id=${gif.id}`);
              }}
              width={width}
              columns={
                width <= 425 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 4
              }
              gutter={6}
              fetchGifs={fetchTrendingGifs}
              hideAttribution={true}
            />
            {/* <ResizeObserver
              onResize={({ width }) => {
                setWidth(width);
              }}
            /> */}
          </div>
        )}
      </>
    </>
  );
}
