import { useParams , Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams(); //получение данных из объекта хуком useParams, получаем данные из url
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
         // eslint-disable-next-line
    },[comicId]) //отслеживать состояние comicId и вызывать обновление



    const updateComic = () => {
        clearError(); //очистка ошибки для отрисовки новых данных
        getComic(comicId) //получение комикса по полученному из useParams айдишнику
            .then(onComicLoaded) //передача трансформированного объекта comic если резултат успешен
    }

    const onComicLoaded = (comic) => { //функция по загрузке комикса
        setComic(comic);  // {comic} - тоже самое что и {comic:comic};
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
         <>
            {errorMessage}
            {spinner}
            {content}
         </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price } = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language:{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )

}

export default SingleComicPage;