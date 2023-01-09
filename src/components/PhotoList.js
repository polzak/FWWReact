import { useState, useEffect } from 'react'
// import axios from 'axios'
import useAxios from 'axios-hooks';
import style from './PhotoList.module.css'



const PhotoList = () => {

    // const [photos, setPhotos] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // const [error, setError] = useState(false)

    const [{ data, loading, error }, refetch] = useAxios(
        'https://picsum.photos/v2/list'
        );

    // useEffect(() => {

    //     const getPhotos = async () => {
    //         const result = await axios('https://picsum.photos/v2/list')
    //         setPhotos(result.data)
    //     }
        
    //     getPhotos()
    //     setIsLoading(false)

    // }, [])


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
                loading ? <LoadingSpinner /> :
                    <div className={style.grid}>
                        {
                            data.map((photo, index) => (
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