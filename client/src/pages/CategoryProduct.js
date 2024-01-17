import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
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
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  {/* </Link> */}
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
