import Reacet from "react"
import styles from "../popup.module.css"
import { getArtistInfo } from "./lastfm"

export default function Popup({ album, onClose }) {
    if (!album || !album.image)
        return

    console.log(album)


    return (
        <div
            className={styles.popupOverlay}
            onClick={onClose}
        >
            <div
                className={styles.popupContent}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={album.image[3]["#text"] || "/placeholder.png"}
                    alt={album.name}
                    className={styles.albumImage}
                />
                <h2>{album.name}</h2>
                <a><strong>Artist:</strong> {album.artist.name}</a>
                <p><strong>Plays:</strong> {album.playcount || "Unknown"}</p>
                <a href={album.url}><strong>Listen Now</strong></a>
            </div>
        </div>
    )
}