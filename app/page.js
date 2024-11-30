"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react"
import { getLibrary } from "./helpers/lastfm";

export default function Home() {
  const [library, setLibrary] = useState([])
  const [error, setError] = useState(null)

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

  return (
    <main>
      <h1>Sound-Stash</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="album-grid">
          {library.map((album, index) => (
            <div key={album.mbid || index} className="album-card">
              <img
                src={album.image[2]["#text"] || "/placeholder.png"}
                alt={album.name}
                className="album-cover"
              />
              <p>{album.name}</p>
              <p>Playcount: {album.playcount}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
