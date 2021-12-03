import {modalInstance} from "./customModal";

const sendForm = () => {
    const form = document.querySelector('.modal-form');

    //получаем эксземпляры модалок
    const modalForm = modalInstance({
        modalID: 'modalForm',
    });
    const modalThanks = modalInstance({
        modalID: 'modalThanks',
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        setTimeout(() => { //типа мы отправляем данные
            //тут закрываем модалку и открываем окно со спасибками
            modalForm.closeModal(() => {
                modalThanks.openModal();
                setTimeout(() => {
                    modalThanks.closeModal();
                }, 2000);
                // можно сделать так - modalThanks.openModalWithTimer(2000);
            })
        }, 1000);

    });

}
export default sendForm;
