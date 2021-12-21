//В index.html
//1 получить массив объектов user с endpoint`а https://jsonplaceholder.typicode.com/users
//2 Вывести id,name всех user в index.html. Отдельный блок для каждого user.
//3 Добавить каждому блоку кнопку/ссылку , при клике на которую происходит переход на страницу user-details.html, которая имеет детальную информацию про объект на который кликнули



fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.json();
    })
    .then(users => {
        let wraper = document.createElement('div');
        wraper.classList.add('wraper');
        for (const user of users) {
            let divCard = document.createElement('div');
            divCard.classList.add('card');
            divCard.innerHTML = `
                        <h3>ID: ${user.id}</h3>
                        <h4>Name: ${user.name}</h4>
                        `;
            let button = document.createElement('button');
            button.innerText = 'ПОКАЗАТИ ПОДРОБИЦІ';
            button.onclick = (id) => {
                localStorage.setItem('user-click', user.id);
                window.location.href = 'user-details.html';
            };
            divCard.appendChild(button);
            wraper.appendChild(divCard);
            document.body.appendChild(wraper);
        }
    });
