import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues]=useSearch();
    const navigate = useNavigate();
  return (
    <Layout title={'Search results'} >
        <div className='container'>
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length<1?'No Products Found' : `Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap mt-4">
            {values?.results.map((product) => (
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
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>
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
            </div>
        </div>
    </Layout>
  )
}

export default Search