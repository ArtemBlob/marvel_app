
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=346cb8ad17bfaf962c6faf338c99e4b4';

    _baseOffset = 210

    getResource = async(url) => { //get запрос с получением информации с сервера
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); //массив данных персонажей, которые в колбэке превращаются в массив объектов нужного формата
    }

    getCharacter = async (id) =>{ //метод по получению персонажа и возврата данных в объект
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]); //оптимизация, передача сразу необходимого объекта персонажа
    }

    _transformCharacter = (char) => { //метод по трансформации возвращаемого с сервера объекта в необходимые для нашего объекта данные
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character', //Обрезать описание, если слишком большое, а если текста нет, вставлять текст об отсутствии описания
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,

        }
    }
}

export default MarvelService;