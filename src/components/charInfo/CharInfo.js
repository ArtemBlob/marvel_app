import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
         // eslint-disable-next-line
    },[props.charId]) //отслеживать состояние props.charId и вызывать обновление



    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => { //функция по загрузке персонажа
        setChar(char);  // {char} - тоже самое что и {char:char}.
        setLoading(false);// Как только загружаются данные, позиция loading меняется на false
    }

    const onCharLoading = () => { //функция состояния загрузки для вызова спиннера
        setLoading(true);
    }
    
    const onError = () => { //функция по выводу сообщения об ошибке
        setLoading(false);
        setError(true);
    }

    const skeleton = char || error || loading ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null; //если нет ошибки и загрузки, и есть персонаж, запускать рендерящийся компонент. null ничего на странице не отобразит


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    //конструкция для настройки нормальной формы изображения
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }


    return (
        
        //реакт фрагмент из-за отсутствия общего родительского компонента
        <> 
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "There is no comics with this character..."} 
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 9) return;
                            return (
                                <li key = {i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}

CharInfo.propTypes = { //проверка типа пропов
    charId: PropTypes.number
}

export default CharInfo;