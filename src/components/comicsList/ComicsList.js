import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) { // специалньая SFM конструкция для проверки состояния процесса и рендеринга компонентов на страницу соответственно
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>; //если будет подзагрузка новых элементов, то спинер запускать не нужно
        case 'confirmed':
            return <Component/>; //рендеринг компонента, если все подтверждено
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); //загрузка новых комиксов
    const [offset, setOffset] = useState(0); //текущий отступ списка комиксов в сервисе Марвел АПИ, добавлено для изменений
    const [comicsEnded, setComicsEnded] = useState(false);  //на сервисе закончились комикса

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true); //будет подставлен offset, равный 8. Второй аргумент true для первичной загрузки
         // eslint-disable-next-line
    }, [])   //запуск формирования листка комиксов только при первой визуализации компонента

    const onRequest = (offset, initial) => { // функция по формированию листка комиксов, в том числе по клику
        initial ? setNewItemLoading(false) : setNewItemLoading(true); //если загрузка первичная, то загрузку запускать надо. При повторной загрузке состояние true, то есть не нужно запускать спиннер
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));  //когда процесс запрооса завершен, он переходит в состояние confirmed
    }

    const onComicsListLoaded = (newComicsList) => { //функция по загрузке листа комиксов
        let ended = false; //спец переменная для установки окончания комиксов
        if (newComicsList.length < 8) { //если кол-во комиксов при загрузке меньше 8, значит комиксы закончились
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);//формирование нового массива из новых и старых элементов. При первом запуске, в этой функции массив charList пустой и формируется только из newCharList
        setNewItemLoading(false);
        setOffset(offset => offset + 8); //увеличение отступа комиксов на 8, для дозагрузки новых
        setComicsEnded(ended); //метка для окончания комиксов
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key ={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button className="button button__main button__long"
                    disabled ={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;