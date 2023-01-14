import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardType from "../components/CardType";
import Spinner from "../components/Spinner";
import { getBlog } from "../redux/features/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => ({ ...state.blog }));

  useEffect(() => {
    dispatch(getBlog());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
      {blogs.length === 0 && (
        <div
          style={{ fontFamily: "Ubuntu Condensed" }}
          className="text-center mb-0"
          tag="h2"
        >
          No Blogs found
        </div>
      )}
      <div className="container mt-5">
        <div className="row">
          {blogs &&
            blogs.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 m-auto">
                <CardType item={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
