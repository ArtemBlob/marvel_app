import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {//синтаксис полей классов, конструктор не обязателен
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() { //специальный метод жизненного цикла, вызывается при добавлении компонента в DOM
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount() { //специальный метод жизненного цикла, вызывается перед удалением компонента из DOM
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { //метод по загрузке персонажа
        this.setState({
            char, // {char} - тоже самое что и {char:char}.
            loading: false // Как только загружаются данные, позиция loading меняется на false
        }) 
    }

    onCharLoading = () => {
        this.setState({
            loading:true
        })
    }
    
    onError = () => { //метод по выводу сообщения об ошибке
        this.setState({
            loading: false,
            error: true,
        }) 
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //для получения рандомного айди персонажа, math.floor для округленя результата
        this.onCharLoading();
        this.marvelService
            .getCharacter(id) //работу объекта можно посмотреть в MarvelService
            .then(this.onCharLoaded) //при использовании промисов, если аргументом then - является ссылка на функцию, аргумент, который придет в then будет автоматически передаваться в функцию
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state; //двойная деструктуризация
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
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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