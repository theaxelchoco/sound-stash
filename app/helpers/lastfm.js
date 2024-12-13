
export const getLibrary = async (userName) => {
    const user = userName == "" ? process.env.NEXT_PUBLIC_USERNAME : userName
    const LIBRARYURL = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`


    try {
        const response = await fetch(LIBRARYURL)

        if (!response.ok)
            throw new Error("Failed to fetch albums :(")

        const data = await response.json()
        return data.topalbums.album

    } catch (err) {
        return null
    }
}

export const getArtistInfo = async (artist) => {
    const ARTISTURL = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`
    const response = await fetch(ARTISTURL)

    if (!response.ok)
        throw new Error("Failed to fetch artist information :(")

    const data = await response.json()
    console.log(data)
    return data
}