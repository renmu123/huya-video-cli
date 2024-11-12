import fs from "fs-extra";
import path from "node:path";

import { SingleBar } from "cli-progress";
import M3U8Downloader from "@renmu/m3u8-downloader";

import { getVideoInfo } from "./api.js";

export async function downloadVideo(
  videoId: string,
  dir: string,
  opts: {
    concurrency?: number;
    ffmpegBinPath?: string;
    webhook?: boolean;
    url?: string;
  }
) {
  const filePath = path.join(dir, `${videoId}.ts`);
  if (await fs.pathExists(filePath)) {
    throw new Error("文件已存在，跳过下载");
  }

  const res = await getVideoInfo(videoId);
  const url = res.data.moment.videoInfo.definitions[0].url;
  console.log(`Downloading video from ${url}`);

  const segmentsDir = path.join(dir, videoId);
  const progressBar = new SingleBar({
    format: "下载进度 |{bar}| {percentage}% | ETA: {eta}s",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });
  progressBar.start(100, 0);

  try {
    await downloadHLS(
      url,
      filePath,
      {
        concurrency: opts.concurrency || 10,
        ffmpegPath: opts.ffmpegBinPath,
        segmentsDir: segmentsDir,
      },
      data => {
        const percentage = Math.floor((data.downloaded / data.total) * 100);
        progressBar.update(percentage);
      }
    );
  } catch (e) {
    fs.remove(segmentsDir);
    throw new Error("下载失败");
  }

  progressBar.stop();
  progressBar.update(100);
}

export const downloadHLS = (
  url: string,
  filePath: string,
  options?: {
    concurrency?: number;
    ffmpegPath?: string;
    segmentsDir: string;
  },
  onProgress?: (data: { downloaded: number; total: number }) => void
) => {
  return new Promise((resolve, reject) => {
    const downloader = new M3U8Downloader(url, filePath, {
      ...options,
      mergeSegments: true,
      convert2Mp4: !!options.ffmpegPath,
      clean: false,
    });
    downloader.on("progress", data => {
      onProgress?.(data);
    });
    downloader.on("completed", () => {
      resolve(true);
    });
    downloader.on("error", error => {
      reject(error);
    });

    downloader.download();
  });
};
