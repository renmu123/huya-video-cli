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

export interface VideoDetailRes {
  status: number;
  msg: string;
  data: Data;
}
