const URL = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${process.env.NEXT_PUBLIC_USERNAME}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`

export const getLibrary = async () => {
    const response = await fetch(URL)

    if (!response.ok)
        throw new Error("Failed to fetch albums :(")

    const data = await response.json()
    return data.topalbums.album
}