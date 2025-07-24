fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        let usersDiv = document.createElement('div');
        usersDiv.classList.add('users');
        for (const user of users) {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            const userinfo = document.createElement('h3');
            userinfo.innerText = ` id: ${user.id}, name: "${user.name}"`;
            userDiv.appendChild(userinfo);

            const details = document.createElement('a');
            const url = new URL('user-details.html', location.href);
            url.searchParams.set('id', user.id);
            details.href = url.toString();
            details.innerText = 'Details';
            userDiv.appendChild(details);

            usersDiv.appendChild(userDiv);
        }
        document.body.appendChild(usersDiv);
    });