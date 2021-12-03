import {modalInstance} from "./modules/customModal";
import sendForm from "./modules/sendForm";

//модалка с формой
const modalForm = modalInstance({
    modalID: 'modalForm',
    modalSelector: '.modal-form',
    buttonsClassName: 'modal1-activator',
    modalActiveClass: 'show',
    modalContentClass: 'modal-content',
    buttonCloseClass: 'modal-close',

});
//модалка со спасибками
const modalThanks = modalInstance({
    modalID: 'modalThanks',
    modalSelector: '.modal-thanks',
    modalActiveClass: 'show',
});
//просто ещё модалка
const modalDublicated = modalInstance({
    modalID: 'modalDublicated',
    modalSelector: '.modal-dublicated',
    modalActiveClass: 'show',
    buttonsClassName: 'modal2-activator',
    modalContentClass: 'modal-content',
    buttonCloseClass: 'modal-close',
});
sendForm();