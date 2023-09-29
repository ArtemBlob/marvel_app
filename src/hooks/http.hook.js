import { useState, useCallback } from "react";

export const useHttp = () => { //хук для запроса и сохранения локальных состояний
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => { //useCallback, гарантирует, что функция request будет создана только один раз при инициализации компонента и будет повторно использоваться на следующих рендерах.

        setLoading(true);//загрузка меняется на true, пока не пришел запрос

        try {
            const response = await fetch (url, {method, body, headers}); //асинхронный запрос на сервер среди аргументов fetch адрес сервера и объект, принимающий настройки

            if (!response.ok) { //eсли статус ответа не является успешным (например, 404 или 500), выбрасывает объект ошибки
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false); //загрузка останавливается, когда запрос пришел
            return data; //возврат данных от сервера
        } catch(e) {
            setLoading(false); //загрузка останавливается, когда пришла обишка
            setError(e.message);
            throw e; //выкидываем ошибку переменную e
        }
    }, []);

    const clearError = useCallback(() => setError(null), []); //очистка ошибки со страницы, чтобы можно было получить другой результат

    return {loading, request, error, clearError}
}