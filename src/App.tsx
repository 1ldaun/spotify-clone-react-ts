import {useCallback, useEffect} from "react";
import styles from "./App.module.scss";

import SideBar from "./components/SideBar/SideBar";
import Player from "./components/Player/Player";

import Playlists from "./pages/Playlists/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail/PlaylistDetail";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Playlists as PlaylistsType } from "./types/Playlists";
//import {Track} from "./types/Track";
//import {Playlist} from "./types/Playlist";

type AppProps = {
  playlists: PlaylistsType;
  initPlaylists: (data: PlaylistsType) => void;
};

const App = ({ playlists, initPlaylists }: AppProps) => {
//  const [error, setError] = useState<null | string>();
/*    const loadPlaylists = useCallback(async () => {

        if (data?.playlists) {
            initPlaylists(data?.playlists?.items);
        }, [initPlaylists]);*/

    let data: PlaylistsType = {
        href: 'string',
        items: [
            {
                collaborative: false,
                description: 'desc',
                external_urls: {spotify: 'ext_url'},
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
                    external_urls: {spotify: 'string'},
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
                                available_markets: ['', ''],
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
        ],
        limit: 5,
        next: null,
        offset: 2,
        previous: null,
        total: 1,
    }

    function GetPlaylists() {
            return new Promise(() => {
            })
            .then((response) => {
                return data;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const loadPlaylists = useCallback(async () => {
        await GetPlaylists().then((data) => {
            if (data) {
                initPlaylists(data);
            }
        });
    }, [initPlaylists]);

    useEffect(() => {
        loadPlaylists();
    }, [loadPlaylists]);

    return (
        <div className={styles.App}>
          <Router>
            {playlists && <SideBar/>}

            <Route path="/" exact>
              {playlists && <Playlists/>}
            </Route>

            <Route path="/playlist/:id">
              <PlaylistDetail/>
            </Route>

            <Player/>
          </Router>
        </div>
    );
}

const mapStateToProps = (state: { playlists: PlaylistsType }) => {
  return {
    playlists: state.playlists,
  };
};

const mapDispatchToProps = (
  dispatch: (initPlaylists: { type: string; playlists: PlaylistsType }) => void
) => {
  return {
    initPlaylists: (data: PlaylistsType) =>
      dispatch({ type: "init", playlists: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
