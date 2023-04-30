import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestShareButton,
  PinterestIcon,
  RedditIcon,
  RedditShareButton,
  TumblrIcon,
  TumblrShareButton,
} from "react-share";

const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_API_KEY || "");

export const getServerSideProps = async ({ query }: any) => {
  const { data } = await giphyFetch.gif(query?.id);
  return {
    props: {
      gif: data,
    },
  };
};

export default function IndexPage({ gif }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(renderURL())
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderURL: any = () =>
    `${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`;
  return (
    <>
      <h2 className="text-xl py-4 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {gif?.title}
      </h2>
      <div className="w-full">
        {gif ? (
          <Gif
            gif={gif}
            width={900}
            className="w-full"
            hideAttribution={true}
            onGifClick={(gif, e) => {
              e.preventDefault();
            }}
          />
        ) : null}
      </div>
      {gif?.user ? (
        <div className="flex items-center space-x-4 py-4">
          <Image
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            src={gif?.user?.avatar_url}
            alt={gif?.user?.username}
          />
          <div className="font-medium dark:text-white">
            <div>{gif?.user?.username}</div>
          </div>
        </div>
      ) : null}
      <hr />
      <div className="space-x-4 py-4">
        <FacebookShareButton url={renderURL()}>
          <FacebookIcon size={44} round />
        </FacebookShareButton>
        <TwitterShareButton url={renderURL()}>
          <TwitterIcon size={44} round />
        </TwitterShareButton>
        <TelegramShareButton url={renderURL()}>
          <TelegramIcon size={44} round />
        </TelegramShareButton>
        <WhatsappShareButton url={renderURL()}>
          <WhatsappIcon size={44} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={renderURL()}>
          <LinkedinIcon size={44} round />
        </LinkedinShareButton>
        <PinterestShareButton url={renderURL()} media={renderURL()}>
          <PinterestIcon size={44} round />
        </PinterestShareButton>
        <TumblrShareButton url={renderURL()}>
          <TumblrIcon size={44} round />
        </TumblrShareButton>
        <RedditShareButton url={renderURL()}>
          <RedditIcon size={44} round />
        </RedditShareButton>
      </div>
      <hr />
      <h6 className="text-lg py-2 pt-4 font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
        Share URL
      </h6>
      <div className="relative">
        <input
          value={renderURL()}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          readOnly
        />
        <button
          onClick={handleCopyClick}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
}
