"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react"
import { getLibrary } from "./helpers/lastfm";
import Popup from "./helpers/popup";

export default function Home() {
  const [library, setLibrary] = useState([])
  const [error, setError] = useState(null)
  const [activeAlbum, setActiveAlbum] = useState(null)

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const data = await getLibrary()
        setLibrary(data)
      } catch (err) {
        setError(err.message)
      }
    }

    loadLibrary()
  })

  const albumClicked = (album) => {
    if (activeAlbum == album)
      setActiveAlbum(null)
    else
      setActiveAlbum(album)
  }

  return (
    <main>
      <h1>Sound-Stash</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="album-grid">
          {library.map((album, index) => (
            <div key={album.mbid || index} className="album-card" onClick={() => albumClicked(album)}>
              <img
                src={album.image[2]["#text"] || "/placeholder.png"}
                alt={album.name}
                className="album-cover"
              />
              <p className="album-name">{album.name}</p>
              <p className="album-artist">{album.artist.name}</p>
              <p>Playcount: {album.playcount}</p>
            </div>
          ))}
        </div>

      )}

      <Popup album={activeAlbum} onClose={albumClicked} />
    </main>
  );
}
