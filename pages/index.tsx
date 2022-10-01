import React, { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const [video, setVideo] = useState("");
  const [metaData, setMetaData] = useState({
    title: "",
    thumbnail_url: "",
  });

  async function download(video: string) {
    const dl = await fetch(`/api/download?url=${video}`);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { title } = await fetchMetadata(video);
    const id = getYoutubeID(video);
    const thumbnail_url = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    setMetaData({ title, thumbnail_url });
  }

  async function fetchMetadata(url: string) {
    const metaData = await fetch(
      "https://noembed.com/embed?dataType=json&url=" + url
    );
    return metaData.json();
  }

  function isValidHttpUrl(str: string) {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function isYoutubeUrl(str: string) {
    return str.indexOf("youtube") > -1;
  }

  function getYoutubeID(url: string) {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      throw new Error("Invalid YouTube URL");
    }
  }

  function getThumbnail(id: string) {
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl pb-4">Video2Blog</h1>
      <form className="pb-4" onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 border-2 min-w-[600px]"
          placeholder="https://youtube.com/..."
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setVideo(e.currentTarget.value)
          }
        />
        {/* <p className="text-red-500">Please enter a valid Youtube URL.</p> */}
        <button className="ml-2 border-2 px-4 py-2">Go</button>
      </form>

      {metaData.thumbnail_url && (
        <>
          <h1 className="max-w-[400px] font-medium text-center pb-4">
            {metaData.title}
          </h1>
          <div className="pb-4">
            <Image src={metaData.thumbnail_url} width="400px" height="250px" />
          </div>
          <button className="ml-2 border-2 px-4 py-2">
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
