import fs from "node:fs";
import data from "./videos_202403291306.json" assert { type: "json" };

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

data.videos.forEach((video) => {
  //   console.log(video.content);
  if (!video.content.startsWith("<iframe")) {
    return;
  }
  const ytID = youtube_parser(video.content);
  const content = `---
slug: ${video.nicetitle}
title: ${video.title}
description: ${video.excerpt}
id: ${ytID}
date: ${video.date}
---
`;
  const path = `./src/content/videos/${video.nicetitle}.md`;

  console.log(`Writing file: ${path}`);
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(`Error writing ${path}:`, err);
    } else {
      console.log(`Successfully wrote: ${path}`);
    }
  });
});
