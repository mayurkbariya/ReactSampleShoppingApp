import React from "react";

function Product({ item  ,index}) {
  return (
    <>
      <div className="product">
        <div className="text-area">
          <h2>{index + 1}</h2>
          <div className="img">
            <img src={item.images[0]} alt="#"/>
          </div>
          <h3>{item.title}</h3>
          <h5>{item.description}</h5>
        </div>
      </div>
    </>
  );
}

export default Product;
