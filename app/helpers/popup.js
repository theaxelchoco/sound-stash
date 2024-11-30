import Reacet from "react"
import styles from "../popup.module.css"
import { getArtistInfo } from "./lastfm"

export default function Popup({ album, onClose }) {
    if (!album)
        return


    console.log(check)

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
                <p><strong>Artist:</strong> {album.artist.name}</p>
                <p><strong>Genre:</strong> {album.genre || "Unknown"}</p>
            </div>
        </div>
    )
}