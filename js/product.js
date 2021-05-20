const app ={
    data: {
        products:[],
    },

    getData(){
        axios.get(`${url}/api/${path}/admin/products`)
        .then(res =>{
            console.log(res);
            if(res.data.success){
                this.data.products = res.data.products;
                console.log(this.data.products);
                this.render();
            }
        })
    },

    render(){
        const productList = document.querySelector('#productList');
        const productCount = document.querySelector('#productCount');
        const productDom = this.data.products.map(item =>`
        <tr>
        <td>${item.title}</td>
        <td width="120">${item.origin_price}</td>
        <td width="120">${item.price}</td>
        <td width="120"> <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span></td>
        <td><button type="button" data-id="${item.id}" class="btn btn-sm btn-outline-danger move delete">刪除</button></td>
      </tr>`).join('');
        productList.innerHTML = productDom;
        productCount.textContent = this.data.products.length;

        const deleteBtn = document.querySelectorAll('.delete');
        deleteBtn.forEach(btn =>{
            btn.addEventListener('click',this.deleteProduct.bind(this));
        })
    },
    deleteProduct(e){
        const id = e.target.dataset.id;
        console.log(this);
        console.log('deleteProduct', e ,id);
        axios.delete(`${url}/api/${path}/admin/product/${id}`)
        .then(res =>{
        if(res.data.success){
            console.log(res);
            this.getData();
        }
        });
    },
    init(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common['Authorization'] = token;

        this.getData();

    }
}
app.init();