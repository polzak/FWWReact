import { useState, useEffect } from 'react'
import style from './PhotoList.module.css'



const PhotoList = () => {

    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

        // setPhotos([
        //     {
        //         "id": "0",
        //         "author": "Alejandro Escamilla",
        //         "width": 5616,
        //         "height": 3744,
        //         "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
        //         "download_url": "https://picsum.photos/id/0/5616/3744"
        //     }
        // ])

        getPhotos()
            .then((photos) => {
                setPhotos(photos)
                setIsLoading(false)
            })
            .catch((e) => {
                setError(true)
                setIsLoading(false)
            })
    }, [])

    const getPhotos = () =>
        window
            .fetch('https://picsum.photos/v2/list')
            .then(async (response) => {
                const data = await response.json()

                if (response.ok) {
                    return data
                } else {
                    return Promise.reject(data)
                }
            })

    const LoadingSpinner = () => {
        return (
            <div className={style.ldsring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }


    return (
        <div>
            <h1>Photos</h1>
            {
                isLoading ? <LoadingSpinner /> :
                    <div className={style.grid}>
                        {
                            photos.map(photo => (
                                <img key={photo.id} src={`https://picsum.photos/id/${photo.id}/200`} alt={`painted by ${photo.author}`} />
                            ))
                        }
                    </div>
            }
            {
                error && <h2>There was an error...</h2>
            }
        </div>
    )
}

export default PhotoList