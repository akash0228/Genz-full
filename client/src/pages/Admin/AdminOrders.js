import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process","Processing","Shipped","delivered","canceled"]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange=async(orderId,value)=>{
    try {
        const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value});
        getOrders();
    } catch (error) {
       console.log(error); 
    }   
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          border={false}
                          onChange={(value) => handleChange(o._id,value)}
                          defaultValue={o?.status}
                        >
                        {status.map((s,i)=>(
                          <Option key={i} value={s}>{s}</Option>
                        ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((product, index) => (
                    <div className="row mb-2 card flex-row p-3">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-4">
                        <p>{product.name}</p>
                        <p>{product.description.substring(0, 35)}</p>
                        <p>Price: ${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
