import axios from "axios";
import type { VideoDetailRes } from "./types/api.js";

function videoJsonpParse(data: string) {
  return JSON.parse(data.replace(/jQuery\d+_\d+\(/, "").replace(/\)/, ""));
}

/**
 * 获取视频信息
 * @param videoId 视频ID
 */
export const getVideoInfo = async (
  videoId: string
): Promise<VideoDetailRes> => {
  const res = await axios.get(
    `https://liveapi.huya.com/moment/getMomentContent?callback=jQuery112402502472954139032_1731331309126`,
    {
      params: {
        videoId: videoId,
      },
    }
  );

  return videoJsonpParse(res.data);
};

/**
 * 获取直播信息
 */
export const getLiveInfo = async (roomId: string) => {
  // const res = await axios.get(
  //   `https://liveapi.huya.com/moment/getMomentContent?callback=jQuery112402502472954139032_1731331309126`,
  //   {
  //     params: {
  //       videoId: videoId,
  //     },
  //   }
  // );
  // return videoJsonpParse(res.data);
};

/**
 * 获取视频列表
 * @param uid 用户ID
 */
export const getVideoList = async (uid: string) => {
  const url = `https://www.huya.com/video/u/${uid}`;
};
