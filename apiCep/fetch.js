const urlViaCep = 'https://viacep.com.br/ws';
fetch(urlViaCep)
.then(response =>{
    return response.json();
})
.then(data => {
    const frame = document.getElementById('frame');
    data.forEach(post => {
        const list = document.createElement('li');
        list.textContent = `${post.title}`;
        frame.appendChild(list);
    });
})
.catch(error =>{
    console.error("Erro: ", error)
})