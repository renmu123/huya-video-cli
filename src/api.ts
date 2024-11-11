import axios from "axios";

interface VideoDefinition {
  size: string;
  width: string;
  height: string;
  definition: string;
  url: string;
  m3u8: string;
  defName: string;
}

interface VideoInfo {
  uid: number;
  avatarUrl: string;
  nickName: string;
  vid: number;
  videoTitle: string;
  videoCover: string;
  videoPlayNum: number;
  videoCommentNum: number;
  videoDuration: string;
  videoUrl: string;
  videoUploadTime: string;
  videoChannel: string;
  category: string;
  definitions: VideoDefinition[];
  videoRecommend: number;
  videoDot: boolean;
  videoRank: number;
  videoHasRanked: boolean;
  traceId: string;
  actorUid: number;
  actorNick: string;
  actorAvatarUrl: string;
  extPlayTimes: number;
  videoBigCover: string;
  commentCount: number;
  tags: string[];
  videoDirection: number;
  briefIntroduction: string;
  videoType: number;
  favorCount: number;
  momId: string;
}

interface Moment {
  momentAttachment: any[];
  momId: string;
  type: number;
  uid: number;
  nickName: string;
  iconUrl: string;
  title: string;
  content: string;
  favorCount: number;
  commentCount: number;
  shareCount: number;
  comment: any[];
  cTime: number;
  status: number;
  opt: number;
  videoInfo: VideoInfo;
  keyWord: string[];
  hasDraw: number;
  coverUrl: string[];
  htmlDoc: string;
  tags: string[];
  belongPlate: string[];
  browseCount: number;
  cardType: number;
  iStepOnCount: number;
  iUserOpt: number;
}

interface Vote {
  voteId: string;
  voteTitle: string;
  voteOption: any[];
}

interface Data {
  moment: Moment;
  vote: Vote;
}

interface ApiResponse {
  status: number;
  msg: string;
  data: Data;
}

function parse(data: string) {
  return JSON.parse(data.replace(/jQuery\d+_\d+\(/, "").replace(/\)/, ""));
}

export const getVideoInfo = async (videoId: string): Promise<ApiResponse> => {
  const res = await axios.get(
    `https://liveapi.huya.com/moment/getMomentContent?callback=jQuery112402502472954139032_1731331309126`,
    {
      params: {
        videoId: videoId,
      },
    }
  );

  return parse(res.data);
};
