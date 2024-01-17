import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts]=useState([]);

  //initial p details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data?.product);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct=async(pid,cid)=>{
    try {
       const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
       setRelatedProducts(data?.products);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product?.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product?.name}</h6>
          <h6>Description:{product?.description}</h6>
          <h6>Price:{product?.price}</h6>
          <h6>Category:{product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">Add To Cart</button>
        </div>
      </div>
        <hr />
      <div className="row container">
        <h6>Similar Product</h6>
        {relatedProducts.length<1 && (<p className="text-center">No Similar Products Found</p>)}
        <div className="d-flex flex-wrap">
            {relatedProducts?.map((product) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {product.price}</p>
                  {/* <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    key={product._id}
                    className="product-link"
                  > */}
                  {/* </Link> */}
                  <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
