'use strict';

const enter = document.querySelector('.main__btn');
const textInput = document.querySelector('input');
const doneBtn = document.querySelectorAll('.main__done');
const closeListBtn = document.querySelector('.header__btn');
const penBtn = document.querySelectorAll('.main__pen');

const form = document.querySelector('.main__list');
const card = document.querySelector('.main__items');
const changed = document.querySelectorAll('.main__changed');


class App {
    _newItem = [];
    text;
    constructor() {
        //ЗАКРЫТИЕ ПРИЛОЖЕНИЯ
        closeListBtn.addEventListener('click', this.closeApp.bind(this));
        //добавление нового айтема
        enter.addEventListener('click', this._enterNewItem.bind(this));
        //клик по форме
        form.addEventListener('click', this._handleListClick.bind(this));
        //получение local storage
        this._getLocalStorage();
    }

    //добавление нового itema в список
    _enterNewItem() {
        let text = textInput.value;
        let newItem;
        if (text) {
            newItem = `
            <div class="main__items">
                <li   class="main__item">${text}</li>
                <img class="main__pen" src="/icons/pen.png" alt="">
                <img class="main__done" src="icons/close.png" alt="">
            </div>
    `;
            textInput.value = '';
            this._newItem.push(newItem);
            //отправление в local storage
            this._setLocalStorage();
            return form.insertAdjacentHTML('afterbegin', newItem);

        } //else {
        //     alert('Вы ничего не ввели!');
        // }

    }

    _handleListClick(e) {
        if (e.target.classList.contains('main__done')) {
            this._itemIsDone(e);
        } else if (e.target.classList.contains('main__pen')) {
            this._editItem(e);
        } else if (e.target.classList.contains('main__changed')) {
            this._changeIcons(e);
        }
    }

    //перечеркивание item
    _itemIsDone(e) {
        const item = e.target.closest('.main__items');
        if (item) {
            item.classList.toggle('main__done');
        }
    }

    //редактирование уже имеющихся items
    _editItem(e) {
        if (e.target.classList.contains('main__pen')) {
            const item = e.target.previousElementSibling;
            item.setAttribute('contentEditable', 'true');
            item.focus();
            e.target.closest('.main__pen').remove();
            item.insertAdjacentHTML('afterend', '<img class="main__changed" src="/icons/ok.png" alt="">');
        }
    }

    //смена иконок
    _changeIcons(e) {
        if (e.target.classList.contains('main__changed')) {
            const item = e.target.previousElementSibling;
            item.removeAttribute('contentEditable');
            e.target.remove();
            item.insertAdjacentHTML('afterend', '<img class="main__pen" src="/icons/pen.png" alt="">');
        }
    }

    //localstorage
    _setLocalStorage() {
        localStorage.setItem('newItem', JSON.stringify(this._newItem));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('newItem'));
        if (!data) return;
        this._newItem = data;
        this._newItem.forEach(d => this._enterNewItem(d));
    }

    //удаляет данные из localstorage и завершает использование приложения
    closeApp() {
        textInput.classList.add('hidden');
        enter.classList.add('hidden');
        localStorage.removeItem('newItem');
        form.remove(card);
    }
}

const app = new App();
//  localStorage.removeItem('newItem');