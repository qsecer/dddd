const inp = document.querySelector("input");
const data = [];
const outp = document.getElementById('output')

const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, debounceTime);
    };
};

async function machFech(str) {
    if(inp.value === '' || inp.value.length === 0 || inp.value === null){
        console.log('НИЧЕГО НЕ НАЙДЕНО')
        outp.innerHTML = ''
    }else{
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${str}&per_page=5`);

            if (!response.ok) {
                throw new Error('not ok');
            }

            const data = await response.json();
            const repositories = data.items;

            repositories.forEach(repo => {
                let paragraf = document.createElement("div")
                paragraf.classList.add("paragraf")
                paragraf.textContent = repo.name
                paragraf.setAttribute('id', repo.id)
                outp.append(paragraf)
                console.log(repo.name)
                console.log(paragraf)
                paragraf.addEventListener('click', ()=>{
                    outp.innerHTML = '';
                    let result = document.querySelector('.result');
                    result.innerHTML = `Name: ${repo.name}<br>Owner: ${repo.owner.login}<br>Stars: ${repo.stargazers_count}`;
                    result.style.display = 'flex'
                    let img = document.createElement('img');
                    img.classList.add('close')
                    img.src = "close.png"
                    result.append(img)
                    img.addEventListener('click', ()=>{
                        result.innerHTML = ""
                        result.style.display = "none"
                        inp.value = ""
                    })
                })
            });


        } catch (e) {
            console.log(e);
        }
    }
}
const debouncedMachFech = debounce(machFech, 1000);
inp.addEventListener('input', () => {
    debouncedMachFech(inp.value);
});