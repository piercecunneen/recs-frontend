'use strict';

var test = require('tape');
var createObjects = require('../../objects/create-music-objects.js');

test('create Artist', function t(assert) {
  /* eslint-disable max-len */
  var artistSpotifyObject = {
    'external_urls' : {
      'spotify' : 'https://open.spotify.com/artist/68EB3QvNdVLkC7SAgDbHIR'
    },
    'followers' : {
      'href' : null,
      'total' : 129715
    },
    'genres' : [ ],
    'href' : 'https://api.spotify.com/v1/artists/68EB3QvNdVLkC7SAgDbHIR',
    'id' : '68EB3QvNdVLkC7SAgDbHIR',
    'images' : [ {
      'height' : 1000,
      'url' : 'https://i.scdn.co/image/5fae4aa59f348195bc0a50ad8e3168b62c22650e',
      'width' : 1000
    }, {
      'height' : 640,
      'url' : 'https://i.scdn.co/image/6944e777a1742be95305fc0e704b0dbf64370843',
      'width' : 640
    }, {
      'height' : 200,
      'url' : 'https://i.scdn.co/image/47103e4e7122cde4b56222c68f1ce1ddaaa61c69',
      'width' : 200
    }, {
      'height' : 64,
      'url' : 'https://i.scdn.co/image/bbec64dace97e2b237b4089ce02e3ce00b93d217',
      'width' : 64
    } ],
    'name' : 'Marianas Trench',
    'popularity' : 60,
    'type' : 'artist',
    'uri' : 'spotify:artist:68EB3QvNdVLkC7SAgDbHIR'
  };

  var artistObject = {
    'id': '68EB3QvNdVLkC7SAgDbHIR',
    'name': 'Marianas Trench',
    'detailedInfoLink': 'https://api.spotify.com/v1/artists/68EB3QvNdVLkC7SAgDbHIR',
    'linkToSpotify': 'https://open.spotify.com/artist/68EB3QvNdVLkC7SAgDbHIR',
    'genres': [],
    'popularity': 60,
    'images': [ {
      'height' : 1000,
      'url' : 'https://i.scdn.co/image/5fae4aa59f348195bc0a50ad8e3168b62c22650e',
      'width' : 1000
    }, {
      'height' : 640,
      'url' : 'https://i.scdn.co/image/6944e777a1742be95305fc0e704b0dbf64370843',
      'width' : 640
    }, {
      'height' : 200,
      'url' : 'https://i.scdn.co/image/47103e4e7122cde4b56222c68f1ce1ddaaa61c69',
      'width' : 200
    }, {
      'height' : 64,
      'url' : 'https://i.scdn.co/image/bbec64dace97e2b237b4089ce02e3ce00b93d217',
      'width' : 64
    } ],
    'numFollowers': 129715
  };
  /* eslint-enable max-len */
  var artist = createObjects.createArtist(artistSpotifyObject);
  assert.deepEqual(artist, artistObject);
  assert.end();
});

test('create Track', function t(assert) {
  /* eslint-disable max-len */
  var trackSpotifyObject = { 
    "album" : {
      "album_type" : "album",
      "available_markets" : [ "MX", "US" ],
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/0lX1onHpEN0xinSWTieBVS"
      },
      "href" : "https://api.spotify.com/v1/albums/0lX1onHpEN0xinSWTieBVS",
      "id" : "0lX1onHpEN0xinSWTieBVS",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/a64f0bbd64054f40369df18c5d6089cf08c9c523",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/5c1242aa2eff22629da3a406276989ccc5a33167",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/5b518bd1ece589180de787a2f76f2bb044a8f4e7",
        "width" : 64
      } ],
      "name" : "Ever After (Deluxe)",
      "type" : "album",
      "uri" : "spotify:album:0lX1onHpEN0xinSWTieBVS"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/68EB3QvNdVLkC7SAgDbHIR"
      },
      "href" : "https://api.spotify.com/v1/artists/68EB3QvNdVLkC7SAgDbHIR",
      "id" : "68EB3QvNdVLkC7SAgDbHIR",
      "name" : "Marianas Trench",
      "type" : "artist",
      "uri" : "spotify:artist:68EB3QvNdVLkC7SAgDbHIR"
    } ],
    "available_markets" : [ "MX", "US" ],
    "disc_number" : 1,
    "duration_ms" : 201160,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "CAB391100633"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7fMWqGoA1n1W4JJMAso2KP"
    },
    "href" : "https://api.spotify.com/v1/tracks/7fMWqGoA1n1W4JJMAso2KP",
    "id" : "7fMWqGoA1n1W4JJMAso2KP",
    "name" : "Stutter",
    "popularity" : 47,
    "preview_url" : "https://p.scdn.co/mp3-preview/d5afa91e8a7e9c5f5680f2f35a0b7ad6fb4d05a6",
    "track_number" : 8,
    "type" : "track",
    "uri" : "spotify:track:7fMWqGoA1n1W4JJMAso2KP"
  };
  var trackObject = {
    "album" : {
      "albumType": "album",
      "availableMarkets": ["MX", "US"],
      "linkToSpotify": "https://open.spotify.com/album/0lX1onHpEN0xinSWTieBVS",
      "detailedInfoLink" : "https://api.spotify.com/v1/albums/0lX1onHpEN0xinSWTieBVS",
      "id" : "0lX1onHpEN0xinSWTieBVS",
      "albumImages": [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/a64f0bbd64054f40369df18c5d6089cf08c9c523",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/5c1242aa2eff22629da3a406276989ccc5a33167",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/5b518bd1ece589180de787a2f76f2bb044a8f4e7",
        "width" : 64
      } ],
      "title": "Ever After (Deluxe)",
      "genres": undefined,
      "popularity": undefined,
      "releaseDate": undefined,
      "artists": [],
      "tracks": []
    },
    "artists": [
      {
        'id': '68EB3QvNdVLkC7SAgDbHIR',
        'name': 'Marianas Trench',
        'detailedInfoLink': 'https://api.spotify.com/v1/artists/68EB3QvNdVLkC7SAgDbHIR',
        'linkToSpotify': 'https://open.spotify.com/artist/68EB3QvNdVLkC7SAgDbHIR',
        "genres": undefined,
        "popularity": undefined,
        "images": undefined
      }
    ],
    "id": "7fMWqGoA1n1W4JJMAso2KP",
    "detailedInfoLink": "https://api.spotify.com/v1/tracks/7fMWqGoA1n1W4JJMAso2KP",
    "title": "Stutter",
    "trackNumber": 8,
    "previewURL": "https://p.scdn.co/mp3-preview/d5afa91e8a7e9c5f5680f2f35a0b7ad6fb4d05a6",
    "duration": 201160,
    "availableMarkets": ["MX", "US"],
    "isExplicit": false,
    "popularity": 47
  };
  /* eslint-enable max-len */
  var track = createObjects.createTrack(trackSpotifyObject);
  assert.deepEqual(track, trackObject);
  assert.end();
});

