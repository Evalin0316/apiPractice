const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const loginBtn = document.querySelector('#login')
loginBtn.addEventListener('click',login);

function login(e){
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const data = {
        username,
        password,
    }
    
    console.log(data);
    axios.post(`${url}/admin/signin`, data)
        .then((res) => {
        console.log(res);
        if(res.data.success){
            // const token = res.data.token;
            // const expired =  res.data.expired;
            const { token, expired } = res.data;
            console.log(token,expired);
            document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
            window.location='https://evalin0316.github.io/apiPractice/product.html';
        }else{
            alert(res.data.message);
            window.location.reload();
        }
    }).catch((error)=>{
       console.log(error);
    });
}

