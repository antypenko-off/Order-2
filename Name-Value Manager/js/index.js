    const items = [];

    const inputEl = document.getElementById('nv-input');
    const addBtn = document.getElementById('add-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const sortNameBtn = document.getElementById('sort-name-btn');
    const sortValueBtn = document.getElementById('sort-value-btn');
    const listEl = document.getElementById('nv-list');


    const nvRegex = /^[A-Za-z0-9]+\s*=\s*[A-Za-z0-9]+\s*$/;


    function validateInput() {
        addBtn.disabled = !inputEl.value.match(nvRegex);
        addBtn.style.cursor = addBtn.disabled ? 'default' : 'pointer';
    }

    function addPair() {
        const [rawName, rawValue] = inputEl.value.split('=');
        const name = rawName.trim();
        const value = rawValue.trim();
        const exists = items.find(i => i.name === name);
        if (exists) exists.value = value;
        else items.push({name, value, selected: false});
        inputEl.value = '';
        addBtn.disabled = true;
        renderList();
    }

    function renderList() {
        listEl.innerHTML = '';
        items.forEach((item) => {
            const li = document.createElement('li');
            li.innerText = `${item.name} = ${item.value}`;
            if (item.selected) li.classList.add('selected');
            li.addEventListener('click', () => {
                item.selected = !item.selected;
                renderList();
            });
            listEl.appendChild(li);
        });
    }

    inputEl.addEventListener('input', validateInput);
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !addBtn.disabled) {
            e.preventDefault();
            addPair();
        }
    });

    deleteBtn.addEventListener('click', () => {
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].selected) items.splice(i, 1);
        }
        renderList();
    });

    addBtn.addEventListener('click', addPair);

    sortNameBtn.addEventListener('click', () => {
        items.sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        renderList();
    });

    sortValueBtn.addEventListener('click', () => {
        items.sort((a, b) => {
            if (a.value < b.value)
                return -1;
            if (a.value > b.value)
                return 1;
            return 0;
        });
        renderList();
    });

