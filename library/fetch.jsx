const getProduct = async () => {
    try{
        const response = await fetch('https://fakestoreapi.com/products',{
            method: 'GET',
            headers: {
                accept:'application/json'
            }
        });


        const json = await response.json()
        return json
    }
    catch(e){
        console.error(e)
    }


}

const getIndividualProduct = async (id) => {
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
            method: 'GET',
            headers: {
                accept:'application/json'
            }
        });



        const json = await response.json()
        return json
    }
    catch(e){
        console.error(e)
    }
}

const getProductByTitle = async (title) => {
    try{
        //return await getProduct()
        const json = await getProduct();
        //console.log(title)
        const product = json.filter((item) =>
            item.title.toLowerCase().includes(title.toLowerCase()));
        //console.log(product)
        return product
    }
    catch(e){
        console.error(e)
        return []
    }
}

export { getProduct, getIndividualProduct,getProductByTitle };