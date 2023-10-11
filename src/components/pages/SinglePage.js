import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

//универсальный компонент для singleComic и singleCharacter, рендерится в соответствии с переданными пропсами Component и dataType
const SinglePage = ({Component, dataType}) => {
    const {id} = useParams(); //получение данных из объекта хуком useParams, получаем данные из url
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
         // eslint-disable-next-line
    },[id]) //отслеживать состояние id и вызывать обновление



    const updateData = () => {
        clearError(); //очистка ошибки для отрисовки новых данных

        switch (dataType) { //проверяем тип данных
            case 'comic': //если комикс в пропсах, соответственно вызов метода по получению комикса с апишки
                getComic(id).then(onDataLoaded);
                break;
            case 'character': //если персонаж в пропсах, соответственно метод по получению персонажа с апишки
                getCharacter(id).then(onDataLoaded);
                break;
            default:
        }
    }

    const onDataLoaded = (data) => { //функция по загрузке данных
        setData(data);  // {data} - тоже самое что и {data:data};
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
         <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
         </>
    )
}


export default SinglePage;