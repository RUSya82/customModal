# Класс быстрого подключения модального окна customModal
Class for modal
Класс модального окна позволяет быстро прикрутить скрипт модального окна(сколько угодно окон) к Вашему сайту  
Также с помощью callback - функций возможно гибко настраивать открытие других модальных окон (окно благодарности например) и их закрытие через таймер  
Для получения экземпляра модального окна реализована статическая функция `modalGetInstance`, которая в замыкании хранит массив со всеми объектами модалок.  
`modalGetInstance` - возвращает функцию, которая и импортируется в другие модули. Эта функция контролирует, если ли уже объект такой модалки или нет. Если есть, то возвращает его из замыкания, если нет, то создает новый.  
Это дает нам контроль, и не позволяет создавать дубли объектов,соответственно не навешивая новых событий на кнопки.
Класс предназначен в первую очередь для облегчения работы JS программиста. Стили модалки, анимация открытия, закрытия - остаются на верстальщике, требуется передать лишь класс открытого модального окна  

##Стандартное использование
###HTML
```HTML
<div class="modal custom-modal">
    <div class="modal-content custom-modal-content">
        <div class="modal-close custom-modal-close">X</div>
        <p>Это просто дубль модалки для теста</p>
    </div>
</div>
```
###CSS
```примерный CSS
.modal{
    opacity: 0;
    visibility: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal.show{
    opacity: 1;
    visibility: visible;
}
.modal.show .modal-content{
    transform: scale(1);
}
.modal-content{
    max-width: 300px;
    padding: 30px 30px;
    background-color: #24241f;
    color: white;
    border-radius: 10px;
    position: relative;
    transition: all 0.4s ease;
    transform: scale(0.1);
}
.modal-close{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}
```
###JavaScript
```JavaScript
  import {modalInstance} from "./modules/customModal";
  const modalDublicate = modalInstance({
    modalID: 'modalDublicate',
  });
```
Пример более продвинутого использования есть в файлах репозитория
