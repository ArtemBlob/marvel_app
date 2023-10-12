import { useState, useCallback } from "react";

export const useHttp = () => { //хук для запроса и сохранения локальных состояний

    const [process, setProcess] = useState('waiting') //state для SFM, ожидание

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => { //useCallback, гарантирует, что функция request будет создана только один раз при инициализации компонента и будет повторно использоваться на следующих рендерах.
        

        setProcess('loading'); //SFM state когда инициируется request, процесс переходит в loading
        try {
            const response = await fetch (url, {method, body, headers}); //асинхронный запрос на сервер среди аргументов fetch адрес сервера и объект, принимающий настройки

            if (!response.ok) { //eсли статус ответа не является успешным (например, 404 или 500), выбрасывает объект ошибки
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data; //возврат данных от сервера
        } catch(e) {

            setProcess('error');
            throw e; //выкидываем ошибку переменную e
        }
    }, []);

    const clearError = useCallback(() => {

        setProcess('loading'); //если произошла ошибка, нужно процесс поставить в загрузку
    }, []); //очистка ошибки со страницы, чтобы можно было получить другой результат

    return {request, clearError, process, setProcess}
}