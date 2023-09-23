import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false, //загрузка, относящаяся к новым элементам, переменная для кнопки
        offset: 210, //текущий отступ персонажей в сервисе Марвел АПИ, добавлено для изменений
        charEnded: false, //на сервисе закончились персонажи
    }
    

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(); //здесь нет аргумента, следовательно будет подставлен базовый offset, равный 9
    }

    onRequest = (offset) => { //метод по формированию листка персонажей, в том числе по клику, если у onRequest есть аргумент
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { //метод по загрузке листа персонажей
        let ended = false; //спец переменная для установки окончания перснажей
        if (newCharList.length < 9) { //если кол-во персонажей при загрузке меньше 9, значит персонажи закончились
            ended = true;
        }
        this.setState(({charList, offset}) => ({ //круглые скобки означают, что возвращается объект
                charList: [...charList, ...newCharList], //формирование нового массива из новых и старых элементов. При первом запуске, в этом методе массив charList пустой и формируется только из newCharList
                loading: false,
                newItemLoading: false,
                offset: offset + 9, //увеличение отступа персонажей на 9, для дозагрузки новых персонажей
                charEnded: ended, //метка для окончания персонажей
        }))
    }

    onError = () => { //метод по выводу сообщения об ошибке
        this.setState({
            loading: false,
            error: true,
        }) 
    }

    itemRefs = []; //это массив, в котором будут храниться ссылки на DOM-элементы, создан, чтобы иметь доступ к элементам по индексу

    setRef = (ref) => { // это функция, которая добавляет переданный ей ref (ссылку на DOM-элемент) в массив itemRefs
        this.itemRefs.push(ref);
    }

    
    focusOnItem = (id) => { //это функция, которая принимает id (индекс) элемента, который нужно сфокусировать
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected')); //удаляет класс 'char__item_selected' у всех остальных элементов
        this.itemRefs[id].classList.add('char__item_selected'); //добавляет класс к выбранному элементу
        this.itemRefs[id].focus(); //метод focus() для установки фокуса на выбранном элементе
    }

    renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'}; //для нормального формата изображения
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li
                className='char__item'
                tabIndex={0}
                ref={this.setRef} //ref ссылка
                key={item.id}
                onClick={() => {
                    this.props.onCharSelected(item.id);
                    this.focusOnItem(i); //вызов функции фокуса
                }}
                onKeyDown={(e) => { //управление элементами нажатием клавиш
                    if (e.key === ' ' || e.key === "Enter") {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
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

    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}} //ecли charEnded (закончились персонажи на сервиса) true - display: none, иначе display: block
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = { //проверка типа пропов и то, что он действительно пришел
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;