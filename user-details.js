
//На странице user-details.html:
//4 Вывести всю, без исключения, информацию про объект user на кнопку/ссылку которого был совершен клик ранее.
//5 Добавить кнопку "post of current user", при клике на которую, появляются title всех постов текущего юзера
//(для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//    6 Каждому посту добавить кнопку/ссылку, при клике на которую происходит переход на страницу post-details.html, которая имеет детальную информацию про текущий пост.


fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.json();
    })
    .then(users => {
        let wraper = document.createElement('div');
        wraper.classList.add('wraper_details');
        for (const user of users) {
            if (user.id === +localStorage.getItem('user-click')) {

                let divUserHeader = document.createElement('div');
                let divUserMain = document.createElement('div');
                let divUserMainRight = document.createElement('div');
                let divUserMainCenter = document.createElement('div');
                let divUserMainLeft = document.createElement('div');
                let divUserFooter = document.createElement('div');
                let divUserFooterCard = document.createElement('div');

                divUserHeader.classList.add('divUserHeader');
                divUserMain.classList.add('divUserMain');
                divUserFooter.classList.add('divUserFooter');
                divUserFooterCard.classList.add('divUserFooterCard');

                divUserMainRight.classList.add('divUserMainRight');
                divUserMainCenter.classList.add('divUserMainCenter');
                divUserMainLeft.classList.add('divUserMainCenter');

                divUserHeader.innerHTML = `
                       <h3>ID: ${user.id}</h3>
                        <h4>Name: ${user.name}</h4>
                        `;

                divUserMainRight.innerHTML = `
                        <h5>Username: ${user.username}</h5>
                        <h5>E-mail: ${user.email}</h5>
                        <h5>ADDRESS:</h5>
                        <h5>street: ${user.address.street}</h5>
                        <h5>suite: ${user.address.suite}</h5>
                        <h5>city: ${user.address.city}</h5>
                        <h5>zip code: ${user.address.zipcode}</h5>
                         `;

                divUserMainCenter.innerHTML = `
                        <h5>GEO:</h5>
                        <h5>lat: ${user.address.geo.lat}</h5>
                        <h5>lng: ${user.address.geo.lng}</h5>
                        <h5>Phone: ${user.phone}</h5>
                        <h5>Website: ${user.website}</h5>
                        `;

                divUserMainLeft.innerHTML = `
                        <h5>COMPANY:</h5>
                        <h5>name: ${user.company.name}</h5>
                        <h5>catch phrase: ${user.company.catchPhrase}</h5>
                        <h5>bs: ${user.company.bs}</h5>
                        `;
                let button = document.createElement('button');
                button.innerText = 'ПОКАЗАТИ ПОСТИ КОРИСТУВАЧА';
                button.onclick = (id) => {
                    fetch('https://jsonplaceholder.typicode.com/posts')
                        .then(response => response.json())
                        .then(posts => {
                            for (const post of posts) {
                                if (user.id === post.userId) {
                                    let divCard = document.createElement('div');
                                    divCard.classList.add('card');
                                    divCard.innerHTML = `
                        <h3>USER ID: ${post.userId}</h3>
                        <h3>ID: ${post.id}</h3>
                        <h4>Title: ${post.title}</h4>
                        <h5>Body: ${post.body}</h5>
                        `;
                                    let buttonR = document.createElement('button');
                                    buttonR.innerText = 'КОМЕНТАРІ ДО ПОСТА';
                                    buttonR.onclick = (id) => {

                                        localStorage.setItem('post-click', post.id);
                                        window.location.href = 'post-details.html';

                                    };

                                    divCard.appendChild(buttonR)
                                    divUserFooterCard.appendChild(divCard)

                                }
                                button.disabled = true;
                            }

                        })
                }

                divUserMain.appendChild(divUserMainRight)
                divUserMain.appendChild(divUserMainCenter)
                divUserMain.appendChild(divUserMainLeft)
                divUserFooter.appendChild(button);
                wraper.appendChild(divUserHeader);
                wraper.appendChild(divUserMain);
                wraper.appendChild(divUserFooter);
                wraper.appendChild(divUserFooterCard);
                document.body.appendChild(wraper);
            }
        }
    });


