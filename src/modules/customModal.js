/**
 * Класс модального окна
 *
 */
class customModal {
    /**
     *
     * @param modalID - уникальный ID модалки для получения объектов в модулях (не имеет отношения к верстке)
     * @param modalSelector - селектор модалки
     * @param buttonsClassName - класс конопок вызова модалки
     * @param modalActiveClass - класс, который добавляем модалке при открытии
     * @param modalContentClass - класс содержимого модалки(без подложки)
     * @param buttonCloseClass - кнопка (крестик) закрытия модалки
     * @param useEscape - использовать ли клавишу Escape для закрытия
     * @param useFadeCLose - использовать ли клик по подложке для закрытия
     */
    constructor({
                    modalID = 'customModal',
                    modalSelector = '.custom-modal' ,
                    buttonsClassName = 'custom-modal-activator',
                    modalActiveClass = 'show',
                    modalContentClass = 'custom-modal-content',
                    buttonCloseClass = 'custom-modal-close',
                    useEscape = true,
                    useFadeCLose = true,
                }) {
        try{
            this.modalID = modalID;
            this.modal = document.querySelector(modalSelector);
            if(buttonsClassName){
                this.modalActivators = document.querySelectorAll('.' + buttonsClassName);
            }
            this.modalActiveClass = modalActiveClass;
            this.modalContentClass = modalContentClass;
            this.buttonCloseClass = buttonCloseClass;
            this.useEscape = useEscape;
            this.useFadeCLose = useFadeCLose;
            if (this.modal){
                this.init();
            } else {
                throw new Error('Modal not found');
            }
        } catch (error){
            console.warn(error);
        }


    }
    //инициализация модалки, тут могут быть и другие методы
    init() {
        this.addListener();
    }
    // Добавляем обработку событий
    addListener() {
        this.modalActivators.forEach(activator => {
            activator.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal()
            });
        });
        this.modal.addEventListener('click', (e) => {
            let isModal;
            if(this.useFadeCLose){
                isModal = e.target.closest(`.${this.modalContentClass}`);
            } else {
                isModal = true;
            }
            const isCloseBtn = e.target.closest(`.${this.buttonCloseClass}`);
            if (!isModal || isCloseBtn) {
                this.closeModal();
            }
        });
        if(this.useEscape){
            document.addEventListener('keydown', (event) =>  {
                if (event.key === 'Escape') {
                    this.closeModal();
                }
            });
        }

    }

    /**
     * метод открытия
     * @param callback - функция, которую вызываем после открытия, по умолчинию - блокировка body
     */
    openModal(callback = () => this.blockBody()) {
        this.modal.classList.add(this.modalActiveClass);
        callback();
    }

    /**
     * метод закрытия модалки
     * @param callBack - функция, которую вызываем после закрытия, по умолчанию - разблокировка body
     */
    closeModal(callBack = () => this.unBlockBody()) {
        this.modal.classList.remove(this.modalActiveClass);
        callBack();
    }

    /**
     * Обёртка над методом openModal, для открытия модалки и закрытия по таймеру
     * @param duration
     */
    openModalWithTimer(duration){
        this.openModal(() => {
            setTimeout(() => {
                this.closeModal();
            }, duration);
        })
    }

    /**
     * Возвращает величину вертикального скролла
     * @returns {number} - вертикальный скролл
     */
    calcScroll() {
        let scrollWidth = 0;
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        if(scrollHeight > document.documentElement.clientHeight){
            let div = document.createElement('div');
            div.style.width = '500px';
            div.style.height = '500px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';
            document.body.appendChild(div);
            scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
        }

        return scrollWidth;
    }

    toggleLockBody() {
        const body = document.body;
        body.classList.toggle('lock');
        const bodyScroll = this.calcScroll();
        if (body.classList.contains('lock')) {
            body.style.marginRight = `${bodyScroll}px`;
        } else {
            body.style.marginRight = `0`;
        }
    }

    /**
     * метод блокировки body
     */
    blockBody() {
        const body = document.body;
        body.style.overflow = 'hidden';
        const bodyScroll = this.calcScroll();
        body.style.marginRight = `${bodyScroll}px`;
    }

    /**
     * метод разблокировки body
     */
    unBlockBody() {
        setTimeout(() => {
            const body = document.body;
            body.style.overflow = 'auto';
            body.style.marginRight = `0`;
        }, 200)
    }

    /**
     * метод получения экземпляра модалки по ID
     * Все модалки хранит в массиве объектов в замыкании
     * @returns {(function(*=): (*))|*} - функция, проверяет, создан экземпляр модалки или нет
     * в зависимости от этого возвращает либо ранее созданный экземпляр,
     * либо новый, созданный с помощью new
     */
    static modalGetInstance(){
        const data = [];
        return function (params){
            let object = data.find(item => item.modalID === params.modalID);
            if(object){
                return object;
            } else {
                const obj = new customModal(params);
                data.push(obj);
                return obj;
            }
        }
    }
}


export const modalInstance = customModal.modalGetInstance();