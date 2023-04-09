import React, { useState, useEffect } from "react";
import Product from "../../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getProducts, changeCategory, changeSerachValue } from "../../Features/Product/ProductSlice/productsSlice";

function Home({ details }) {
  const {
    products, 
    categories, 
    loadingProducts, 
    selectedCategory,
    searchvalue,
  } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  useEffect(()=>{
    let data = products
    if(selectedCategory.length > 0)
    {
      data = data?.filter((item) => item?.category === selectedCategory)
    }
    if(searchvalue.length > 0){
      data = data.filter(item=> item.title.toLowerCase().includes(searchvalue))
    }
    setProductsData(data)
  },[products, selectedCategory, searchvalue])

  const selectChange = (e) => {
    dispatch(changeCategory(e?.value))
  };

  const serchItemValue = (e) => {
    dispatch(changeSerachValue(e.target.value.toLowerCase()))
  };

  return (
    <>
      <div className="product_main">
        <div className="container">
          <div className="heding-line" > 
            <h2>online shopping Cart</h2>
          </div>
          <div className="flex-box">
            
          <div className="inputline">
            <label> Serch Category</label>
            <Select options={[{label: 'All', value:''},...categories]} onChange={(e) => selectChange(e)} defaultValue={selectedCategory}/>
          </div>
          <div className="inputline">
            <label> Serch Item</label>
            <input 
            className="inputbox"
              placeholder="Enter Product Name"
              onChange={(e) => serchItemValue(e)}
            />
          </div>
          </div>
          {
            loadingProducts && <h1  style={{textAlign:'center'}}>
              Loading Products...
            </h1>
          }
          {
            !loadingProducts && productsData.length < 1 && <h1  style={{textAlign:'center'}}>
              No Products Found
            </h1>
          }
          <div className="products">
            {productsData?.map((item, i) => {
              return <Product item={item} index={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
