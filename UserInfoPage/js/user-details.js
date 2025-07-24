const body = document.body;


const userBox = document.createElement('div');
userBox.classList.add('user');


const loadBtn = document.createElement('button');
loadBtn.classList.add('loadPosts');
loadBtn.textContent = 'Posts of current user';


const postsBox = document.createElement('div');
postsBox.classList.add('posts');


body.append(userBox, loadBtn, postsBox);

const id = new URLSearchParams(location.search).get('id');
if (!id) {
    body.textContent = 'User ID missing';
    throw 'no-id';
}

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => r.json())
    .then(u => {
        const h2 = document.createElement('h2');
        h2.textContent = `${u.id}. ${u.name}`;
        userBox.appendChild(h2);

        userBox.appendChild(createTextElement('p', `Username: ${u.username}`));
        userBox.appendChild(linkTextElement('Email: ', u.email, `mailto:${u.email}`));
        userBox.appendChild(linkTextElement('Phone: ', u.phone, `tel:${u.phone}`));
        userBox.appendChild(linkTextElement('Website: ', u.website, `https://${u.website}`));

        userBox.appendChild(createTextElement('h3', 'Address'));
        userBox.appendChild(createTextElement('p', `${u.address.street}, ${u.address.suite}, ${u.address.city} (${u.address.zipcode})`));
        userBox.appendChild(createTextElement('p', `Geo: ${u.address.geo.lat}, ${u.address.geo.lng}`));

        userBox.appendChild(createTextElement('h3', 'Company'));
        userBox.appendChild(createTextElement('p', `Name: ${u.company.name}`));
        userBox.appendChild(createTextElement('p', `Catchphrase: ${u.company.catchPhrase}`));
        userBox.appendChild(createTextElement('p', `BS: ${u.company.bs}`));

    })
    .catch(e => {
        userBox.textContent = "Failed to load User Information";
        console.error(e);
    });

loadBtn.addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(r => r.json())
        .then(posts => {
            posts.forEach(p => {
                const post = document.createElement('div');
                post.classList.add('post');
                const title = document.createElement('p');
                title.textContent = p.title;
                const href = document.createElement('a');
                href.href = `post-details.html?id=${p.id}`;
                href.innerText = 'Post Detail';
                post.appendChild(title);
                post.appendChild(href);
                postsBox.appendChild(post);
            });
            loadBtn.disabled=true;
        })
        .catch(e => {
            postsBox.textContent = "Failed to load Posts Information";
            console.error(e);
        });
});



function linkTextElement(label, text, href) {
    const p = document.createElement('p');
    p.textContent = label;
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    p.appendChild(a);
    return p;
}

function createTextElement(tag, text) {
    const p = document.createElement(`${tag}`);
    p.innerText = text;
    return p;
}