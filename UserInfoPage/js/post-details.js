const body = document.body;


const postSection = document.createElement('section');
postSection.classList.add('post');


const commentsHeader = createTextElement('h2', 'Comments');
commentsHeader.classList.add('comments-header');


const commentsSection = document.createElement('section');
commentsSection.classList.add('comments');


body.append(postSection, commentsHeader, commentsSection);

const id = new URLSearchParams(location.search).get('id');
if (!id) {
    body.textContent = 'Error: Post ID is missing';
    throw new Error('Missing post ID');
}
fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(r => r.json())
    .then(p => {
        postSection.appendChild(createTextElement("p", `Title: ${p.title}`));
        postSection.appendChild(createTextElement("p", `User ID:${p.userId}`));
        postSection.appendChild(createTextElement("p", `Post ID:${p.id}`));
        postSection.appendChild(createTextElement("p", `${p.body}`));

        return id;
    })
    .catch(e => {
        postSection.textContent = "Failed to load Post Information";
        console.error(e);
    })
    .then(pid => fetch(`https://jsonplaceholder.typicode.com/posts/${pid}/comments`))
    .then(r => r.json())
    .then(comments => {
        comments.forEach(comment => {
            const d = document.createElement('div');
            d.className = 'comment';
            d.appendChild(createTextElement('h3', `Name: ${comment.name}`));
            d.appendChild(createTextElement('h4', `Email: ${comment.email}`));
            d.appendChild(createTextElement('p', `${comment.body}`));
            commentsSection.appendChild(d);
        });
    })
    .catch(e => {
        commentsSection.textContent = "Failed to load Comments Information";
        console.error(e);
    });


function createTextElement(tag, text) {
    const p = document.createElement(`${tag}`);
    p.innerText = text;
    return p;
}