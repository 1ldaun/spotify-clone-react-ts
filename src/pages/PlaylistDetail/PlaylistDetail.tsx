import FastAverageColor from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./PlaylistDetail.module.scss";
import { SongItem } from "./SongItem/SongItem";
import { Time } from "../../assets/Time";
import { Track } from "../../types/Track";
import { Playlist } from "../../types/Playlist";

type PlaylistDetailProps = {
  loadSong: (song: Track) => void;
  currentSong: Track;
};

const PlaylistDetail = ({ loadSong, currentSong }: PlaylistDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>();
  const coverRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    loadPlaylistDetails(id);
  }, [id]);

  useEffect(() => {
    if (coverRef.current) {
      coverRef.current.crossOrigin = "Anonymous";
      const fac = new FastAverageColor();
      fac
        .getColorAsync(coverRef.current)
        .then((color) => {
          document.getElementById("Background")!.style.backgroundColor =
            color.rgb;
          document.getElementById("PlaylistBackgorund")!.style.backgroundColor =
            color.rgb;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [playlist]);

  const loadPlaylistDetails =  (playlistId: string) => {
    let data: Playlist = {
      collaborative: false,
      description: 'desc',
      external_urls: { spotify: 'ext_url' },
      href: 'href',
      id: 'id',
      images: [
        {
          height: 512,
          width: 512,
          url: 'url',
        }
      ],
      name: 'name',
      owner: {
        display_name: 'display_name',
        external_urls: { spotify: 'string' },
        href: 'string;',
        id: 'string',
        type: 'string',
        uri: 'string'
      },
      primary_color: null,
      public: null,
      snapshot_id: 'string',
      tracks: {
        href: 'string',
        total: 1,
        items: [
          {
            added_at: 'asd',
            added_by: {
              external_urls: {spotify: 'string'},
              href: 'string',
              id: 'string',
              type: 'string',
              uri: 'string',
            },
            is_local: false,
            primary_color: null,
            track: {
              album: {
                album_type: 'string',
                artists: [
                  {
                    external_urls: {spotify: 'string'},
                    href: 'string',
                    id: 'string',
                    name: 'string',
                    type: 'string',
                    uri: 'string',
                  }
                ],
                available_markets: ['string'],
                external_urls: {spotify: 'string'},
                href: 'string',
                id: 'string',
                images: [
                  {
                    height: 512,
                    width: 512,
                    url: 'string',
                  }
                ],
                name: 'string',
                release_date: 'string',
                release_date_precision: 'string',
                total_tracks: 1,
                type: 'string',
                uri: 'string',
              },
              artists: [
                {
                  external_urls: {spotify: 'string'},
                  href: 'string',
                  id: 'string',
                  name: 'string',
                  type: 'string',
                  uri: 'string',
                }
              ],
              available_markets: ['',''],
              disc_number: 1,
              duration_ms: 240000,
              episode: false,
              explicit: true,
              external_ids: {isrc: 'string'},
              external_urls: {spotify: 'string'},
              href: 'string',
              id: 'string',
              is_local: false,
              name: 'string',
              popularity: 100,
              preview_url: 'string',
              track: true,
              track_number: 1,
              type: 'string',
              uri: 'string',
            },
            video_thumbnail: {url: 'string'},
          }
        ],
        limit: 10,
        next: 'string',
        offset: 2,
        previous: null,
      },
      type: 'string',
      uri: 'string',
    }
    setPlaylist(data);
  }

  const songClicked = (song: Track) => {
    if (song.track.preview_url) {
      loadSong(song);
    }
  };

  return (
    <>
      {playlist && (
        <div className={styles.PlaylistDetail}>
          <div className={styles.Cover}>
            <div className={styles.Background} id="Background"></div>
            <div className={styles.Gradient}></div>
            <div className={styles.Img}>
              <img
                src={playlist.images[0].url}
                alt="playlist img"
                ref={coverRef}
              />
            </div>
            <div className={styles.Infos}>
              <div className={styles.Playlist}>PLAYLIST</div>
              <div className={styles.Title}>
                <h1>{playlist.name}</h1>
              </div>
              <div className={styles.Categ}>{playlist.description}</div>
              <div className={styles.Details}>
                <span className={styles.Text_Bold}>
                  {playlist.owner.display_name}
                </span>
                <span className={styles.Text_Light}>
                  {playlist.tracks.items.length} songs, about 4 hr 20 min
                </span>
              </div>
            </div>
          </div>

          <div className={styles.List_Background} id="PlaylistBackgorund" />
          <div className={styles.List}>
            <div className={styles.Heading_Sticky}>
              <div className={styles.Heading}>
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Date added</div>
                <div className={styles.Length}>
                  <Time />
                </div>
              </div>
            </div>

            {playlist.tracks.items.map((item: Track, index: number) => (
              <SongItem
                key={item.track.id}
                song={item}
                index={index}
                current={item.track.id === currentSong?.track.id ? true : false}
                songClicked={() => songClicked(item)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: { playing: { song: Track } }) => {
  return {
    currentSong: state.playing.song,
  };
};

const mapDispatchToProps = (
  dispatch: (loadSong: { type: string; song: Track }) => void
) => {
  return {
    loadSong: (song: Track) => dispatch({ type: "load", song }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);
