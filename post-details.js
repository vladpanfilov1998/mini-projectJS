
//На странице post-details.html:
//7 Вывести всю, без исключения, информацию про объект post на кнопку/ссылку которого был совершен клик ранее.
//8 Ниже информации про пост, вывести все комментарии текущего поста (эндпоинт для получения информации - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        let wraper = document.createElement('div');


        wraper.classList.add('wraper');

        let divCardFooter = document.createElement('div');
        divCardFooter.classList.add('divCardFooter');

        for (const post of posts) {
            if (post.id === +localStorage.getItem('post-click', post.id)) {
                let divCard = document.createElement('div');
                divCard.classList.add('cardPost');
                divCard.innerHTML = `
                        <h3>USER ID: ${post.userId}</h3>
                        <h3>ID: ${post.id}</h3>
                        <h4>Title: ${post.title}</h4>
                        <h5>Body: ${post.body}</h5>
                        `;
                let buttonP = document.createElement('button');
                buttonP.innerText = 'ВИВЕСТИ КОМЕНТАРІ';
                buttonP.onclick = (id) => {
                    fetch('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments')
                        .then(response => response.json())
                        .then(comments => {
                            for (const comment of comments) {

                                if (post.id === comment.postId) {
                                    let divCardComments = document.createElement('div');
                                    divCardComments.classList.add('cardComments');
                                    divCardComments.innerHTML = `
                                        <h3>Post ID: ${comment.postId}</h3>
                                        <h3>ID: ${comment.id}</h3>
                                        <h4>Name: ${comment.name}</h4>
                                        <h5>E-mail: ${comment.email}</h5>
                                        <h6>Body: ${comment.body}</h6>
                                        `;
                                    divCardFooter.appendChild(divCardComments)
                                }

                                buttonP.disabled = true;
                            }
                        })
                }

                divCard.appendChild(buttonP);
                divCard.appendChild(divCardFooter);

                wraper.appendChild(divCard);
                document.body.appendChild(wraper);
            }
        }
    });
