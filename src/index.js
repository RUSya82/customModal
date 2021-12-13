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
    modalContentClass: 'modal-content',
    buttonsClassName: null
});
//просто ещё модалка
const modalDublicate = modalInstance({
    modalID: 'modalDublicate',
});
sendForm();