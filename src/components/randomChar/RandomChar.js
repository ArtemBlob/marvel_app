import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId =  setInterval(updateChar, 60000);

        return () => { //функция очистки, которая позволяет остановить побочные эффекты непосредственно перед размонтированием компонента.
            clearInterval(timerId)
        }  // eslint-disable-next-line
    }, []) //запуск формирования случайного персонажа только при первой визуализации компонента

    const onCharLoaded = (char) => { //функция по загрузке персонажа
        setChar(char);  // {char} - тоже самое что и {char:char}.
        setLoading(false); // Как только загружаются данные, позиция loading меняется на false
    }

    const onCharLoading = () => {
        setLoading(true);
    }
    
    const onError = () => { //функция по выводу сообщения об ошибке
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //для получения рандомного айди персонажа, math.floor для округленя результата
        onCharLoading();
        marvelService.getCharacter(id) //работу объекта можно посмотреть в MarvelService
            .then(onCharLoaded) //при использовании промисов, если аргументом then - является ссылка на функцию, аргумент, который придет в then будет автоматически передаваться в функцию
            .catch(onError);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null; //есди нет ошибки и загрузки, запускать рендерящийся компонент. null ничего на странице не отобразит

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => { //рендерящий компонент, получает объект с данными, как аргумент, принимает в себя и возвращает участок верстки
    const {name, thumbnail, description, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;