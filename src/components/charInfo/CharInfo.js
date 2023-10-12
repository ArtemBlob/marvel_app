import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
         // eslint-disable-next-line
    },[props.charId]) //отслеживать состояние props.charId и вызывать обновление



    const updateChar = () => {
        const {charId} = props; //получение айди из пропсов
        if (!charId) {
            return;
        }
        clearError(); //очистка ошибки для отрисовки новых данных
        getCharacter(charId) //получение персонажа по айди
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));  //когда процесс запрооса завершен, он переходит в состояние confirmed
    }

    const onCharLoaded = (char) => { //функция по загрузке персонажа
        setChar(char);  // {char} - тоже самое что и {char:char}.
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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