import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

//универсальный компонент для singleComic и singleCharacter, рендерится в соответствии с переданными пропсами Component и dataType
const SinglePage = ({Component, dataType}) => {
    const {id} = useParams(); //получение данных из объекта хуком useParams, получаем данные из url
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
         // eslint-disable-next-line
    },[id]) //отслеживать состояние id и вызывать обновление



    const updateData = () => {
        clearError(); //очистка ошибки для отрисовки новых данных

        switch (dataType) { //проверяем тип данных
            case 'comic': //если комикс в пропсах, соответственно вызов метода по получению комикса с апишки
                getComic(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));  //когда процесс запрооса завершен, он переходит в состояние confirmed
                break;
            case 'character': //если персонаж в пропсах, соответственно метод по получению персонажа с апишки
                getCharacter(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));  //когда процесс запрооса завершен, он переходит в состояние confirmed
                break;
            default:
                throw new Error('Unexpected process state');
        }
    }

    const onDataLoaded = (data) => { //функция по загрузке данных
        setData(data);  // {data} - тоже самое что и {data:data};
    }

    return (
         <>
            <AppBanner/>
            {setContent(process, Component, data)}
         </>
    )
}


export default SinglePage;