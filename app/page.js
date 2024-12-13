"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react"
import { getLibrary } from "./helpers/lastfm";
import Popup from "./helpers/popup";
import { hanalei } from './fonts/Hanalei'


export default function Home() {
  const [library, setLibrary] = useState([])
  const [error, setError] = useState(null)
  const [activeAlbum, setActiveAlbum] = useState(null)
  const [userName, setUserName] = useState("")

  let userInput = ""

  useEffect(() => {
    const loadLibrary = async () => {
      if (userName == "") {
        setLibrary([])
        setError(null)
        return
      }

      try {
        const data = await getLibrary(userName)
        if (data) {
          setLibrary(data)
          setError(null)
        } else {
          setLibrary([])
          setError("No Library Found.")
        }

      } catch (err) {
        setLibrary([])
        setError(err.message)
      }
    }

    loadLibrary()
  }, [userName])

  const albumClicked = (album) => {
    setActiveAlbum((activeAlbum == album) ? null : album)
  }

  return (
    <main>
      <h1 className={hanalei.className}>Sound-Stash</h1>

      <input
        type="text"
        placeholder="Last.FM Username"
        autoFocus={true}
        onChange={(e) => (userInput = e.target.value)}
      />

      <button onClick={() => setUserName(userInput)}>Search</button>

      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="album-grid">
          {library.map((album, index) => (
            <div key={album.mbid || index} className="album-card" onClick={() => albumClicked(album)}>
              <img
                src={album.image[3]["#text"] || "/placeholder.png"}
                alt={album.name}
                className="album-cover"
              />
              <p className="album-name">{album.name}</p>
              <p className="album-artist">{album.artist.name}</p>
            </div>
          ))}
        </div>

      )}

      <Popup album={activeAlbum} onClose={albumClicked} />
    </main>
  );
}
