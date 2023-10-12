import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

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


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); //загрузка новых персонажей
    const [offset, setOffset] = useState(210); //текущий отступ списка персонажей в сервисе Марвел АПИ, добавлено для изменений
    const [charEnded, setCharEnded] = useState(false);  //на сервисе закончились персонажи

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true); //будет подставлен offset, равный 9. Второй аргумент true для первичной загрузки
         // eslint-disable-next-line
    }, [])   //запуск формирования листка персонажей только при первой визуализации компонента
  
    const onRequest = (offset, initial) => { // функция по формированию листка персонажей, в том числе по клику
        initial ? setNewItemLoading(false) : setNewItemLoading(true); //если загрузка первичная, то загрузку запускать надо. При повторной загрузке состояние true, то есть не нужно запускать спиннер
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));  //когда процесс запрооса завершен, он переходит в состояние confirmed
    }

    const onCharListLoaded = (newCharList) => { //функция по загрузке листа персонажей
        let ended = false; //спец переменная для установки окончания перснажей
        if (newCharList.length < 9) { //если кол-во персонажей при загрузке меньше 9, значит персонажи закончились
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);//формирование нового массива из новых и старых элементов. При первом запуске, в этой функции массив charList пустой и формируется только из newCharList
        setNewItemLoading(false);
        setOffset(offset => offset + 9); //увеличение отступа персонажей на 9, для дозагрузки новых персонажей
        setCharEnded(ended); //метка для окончания персонажей
    }

    const itemRefs = useRef([]); //это массив, в котором будут храниться ссылки на DOM-элементы, создан, чтобы иметь доступ к элементам по индексу
    
    const focusOnItem = (id) => { //это функция, которая принимает id (индекс) элемента, который нужно сфокусировать
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected')); //удаляет класс 'char__item_selected' у всех остальных элементов
        itemRefs.current[id].classList.add('char__item_selected'); //добавляет класс к выбранному элементу
        itemRefs.current[id].focus(); //метод focus() для установки фокуса на выбранном элементе
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'}; //для нормального формата изображения
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li
                    className='char__item'
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} //коллбэк реф, который принимает в себя единственным аргументом тот элемент, на котором он был вызван, в данном случае это list item (li). Перееносим li в массив
                    onClick={() => {
                        props.onCharSelected(item.id); //получение id для передачи пропса происходит из объекта в MarvelService
                        focusOnItem(i); //вызов функции фокуса
                    }}
                    onKeyDown={(e) => { //управление элементами нажатием клавиш
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className='char__name'>{item.name}</div>
                </li>
            )
        });

        return (
            <ul className='char__grid'>
                    {items}
            </ul>
        )
    }

    const elements = useMemo(() => { //useMemo для того, чтобы предотвратить повторный рендеринг компонента из-за стейта идущего из MainPage
        return setContent(process, () => renderItems(charList), newItemLoading);
         // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}} //ecли charEnded (закончились персонажи на сервиса) true - display: none, иначе display: block
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = { //проверка типа пропов и то, что он действительно пришел
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;