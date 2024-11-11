import { getVideoInfo } from "./api.js";
import M3U8Downloader from "@renmu/m3u8-downloader";

export async function downloadVideo(
  videoId: string,
  filePath: string,
  opts: {
    concurrency?: number;
    ffmpegBinPath?: string;
    segmentsDir: string;
  }
) {
  const res = await getVideoInfo(videoId);
  const url = res.data.moment.videoInfo.definitions[0].url;
  console.log(`Downloading video from ${url}`);

  try {
    await downloadHLS(
      url,
      filePath,
      {
        concurrency: opts.concurrency || 10,
        ffmpegPath: opts.ffmpegBinPath,
        segmentsDir: opts.segmentsDir,
      },
      data => {
        const percentage = Math.floor((data.downloaded / data.total) * 100);
        console.log(`Downloaded ${percentage}%`);
        // progressBar.update(percentage);
      }
    );
  } catch (e) {
    // fs.remove(segmentsDir);
    throw new Error("下载失败");
  }
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
