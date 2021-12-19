import data from '../watch-history.json';
import { writeFile, existsSync, mkdir } from 'fs';
// import { writeFile } from 'fs/promises';
// const youtubeData = JSON.stringify(data);
// const ax: YoutubeData[] = JSON.parse(youtubeData);

export interface YoutubeData {
  header: Header;
  title: string;
  titleUrl?: string;
  subtitles?: Subtitle[];
  time: Date;
  products: Header[];
  activityControls: ActivityControl[];
  details?: Detail[];
  description?: string;
}

export enum ActivityControl {
  YouTubeWatchHistory = 'YouTube watch history',
  YouTubeSearchHistory = 'YouTube search history',
  WebAppActivity = 'Web & App Activity',
}

export interface Detail {
  name: string;
}

export enum Header {
  YouTube = 'YouTube',
  YouTubeGaming = 'YouTube Gaming',
  YouTubeMusic = 'YouTube Music',
}

export interface Subtitle {
  name: string;
  url?: string;
}

export type Scrobble = {
  albumName: string;
  artistName: string;
  trackName: string;
  datetime: Date;
};

// type History = {
//   header: string;
//   title: string;
//   titleUrl?: string;
//   time: string;
// };

const youtubeData = data as unknown as YoutubeData[];

const scrobbles: Scrobble[] = [];

youtubeData.forEach((item) => {
  scrobbles.push({
    albumName: item.title,
    artistName: item.title,
    trackName: item.title,
    datetime: item.time,
  });
  console.log(item);
});

if (!existsSync('output')) {
  mkdir('output', (err) => console.log(err));
}

writeFile('output/items.json', JSON.stringify(scrobbles), function (err) {
  if (err) {
    console.log(err);
  } else console.log('Done');
});

// const x = data as YoutubeData[];
// x.forEach((x) => {
//   console.log(x);
// });

// data.items.forEach((x) => {
//   watchHis.push({
//     header: x.header,
//     title: x.title,
//     titleUrl: x.titleUrl,
//     time: x.time,
//   });
// });
