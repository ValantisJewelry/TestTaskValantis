import React, { useEffect, useState } from "react";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { handleFetchData } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { handleOffLoding, insertData } from "../../redux/productSlice";
import { handleLoding } from "../../redux/productSlice";
import { RiFilter2Fill } from "react-icons/ri";
import "./board.css";
import List from "./list";

const Board = () => {
  const productsList = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [originList, setOriginList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [filterInput, setFilterInput] = useState("");
  const [listFiltered, setListFiltered] = useState([]);

  useEffect(() => {
    dispatch(handleLoding());

    const returningData = async () => {
      try {
        const data = await handleFetchData({
          action: "get_ids",
          params: { offset: offset, limit: limit },
        });
        dispatch(insertData(data.result));
      } catch (error) {
        dispatch(handleOffLoding());
      }
    };
    returningData();
  }, [offset, limit]);

  useEffect(() => {
    const filter = async () => {
      setListFiltered([]);
      const DuplicateId = await productsList.List.filter((item, index) => {
        return item.id.indexOf(item.id) !== index;
      });
      setOriginList(DuplicateId);
    };
    filter();
  }, [productsList]);

  const handleNextPage = () => {
    setListFiltered([]);
    setOffset((currOffset) => currOffset + 50);
    dispatch(handleLoding());
  };

  const handlePrevPage = () => {
    setListFiltered([]);
    setOffset((currOffset) => currOffset - 50);
    dispatch(handleLoding());
  };

  const handleLimit = (event) => {
    setListFiltered([]);
    setLimit(Number(event.target.value));
  };

  const handleReset = () => {
    setListFiltered([]);
    setLimit(50);
    setOffset(0);
  };

  const filterProducts = () => {
    const filtered = originList.filter((product) => {
      const productName = product.product
        .toLowerCase()
        .includes(filterInput.toLowerCase());
      const id = product.id.toLowerCase().includes(filterInput.toLowerCase());
      const brand =
        product.brand &&
        product.brand.toLowerCase().includes(filterInput.toLowerCase());
      const price =
        product.price &&
        product.price
          .toString()
          .toLowerCase()
          .includes(filterInput.toLowerCase());

      return productName || id || brand || price;
    });
    setListFiltered(filtered);
  };

  return (
    <div className="lg:p-14 p-5">
      <div className="w-full h-[750px]  border-gray-100 p-2 rounded-2xl relative">
        {productsList.loding ? (
          <div className="w-full h-full bg-gray-50 bg-opacity-30 absolute flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : null}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-[280px] h-[40px] rounded-full border-gray-300 border-[1px] flex items-center p-5 gap-2 relative">
            <RiFilter2Fill className="text-gray-700" />
            <input
              placeholder="Filter Products..."
              className=" outline-none"
              onChange={(e) => setFilterInput(e.target.value)}
            />
            <button
              onClick={() => filterProducts()}
              className=" absolute right-1 w-[35px] h-[35px] flex items-center justify-center hover:bg-blue-500 duration-300 bg-gray-700 text-white rounded-full"
            >
              <HiMiniAdjustmentsVertical className="w-[20px] h-[20px]" />
            </button>
          </div>

          <button
            onClick={() => handleReset()}
            className="hover:text-red-500 duration-300 w-[100px] h-[40px] rounded-lg flex items-center justify-center p-2 gap-2 text-gray-500"
          >
            <GrPowerReset />
            <h1 className="font-[700]">Rest</h1>
          </button>
        </div>
        <div className="w-full h-[40px] mb-2 pr-10 bg-gray-100 bg-opacity-70 rounded-xl flex items-center p-5 text-sm font-bold text-gray-500">
          <section className="flex-1">ID #</section>
          <section className="flex-1 pl-10">Products Name</section>
          <section className="flex-1 flex justify-center">Price</section>
          <section className="flex-1 flex justify-center">Brand</section>
        </div>

        <section
          className={`w-full h-[75%] ${
            productsList.loding ? "overflow-hidden" : "overflow-auto"
          }  `}
        >
          {listFiltered.length >= 1 ? (
            <div>
              {listFiltered.map((item, index) => (
                <List item={item} index={index} />
              ))}
            </div>
          ) : (
            <div>
              {originList.map((item, index) => (
                <List item={item} index={index} />
              ))}
            </div>
          )}
        </section>

        <div className="p-5 pt-5 flex justify-between">
          <section className="flex items-center gap-2">
            <h1 className="font-[700] lg:text-lg text-xs  text-gray-500">
              Show Items :{" "}
            </h1>
            <select
              onChange={handleLimit}
              className="border-[1px] rounded-md cursor-pointer text-sm"
            >
              <option value="50" selected disabled hidden>
                50
              </option>
              <option className="text-sm">50</option>
              <option className="text-sm">30</option>
              <option className="text-sm">10</option>
            </select>
          </section>
          <section className="flex items-center lg:gap-10 gap-5">
            <div className="text-gray-400 font-bold lg:text-md text-xs  ">
              Result :{" "}
              {listFiltered.length >= 1
                ? listFiltered.length
                : originList.length}
            </div>
            <button
              onClick={handlePrevPage}
              className={`flex items-center gap-1 ${"text-gray-800 hover:text-blue-500 duration-300"}  `}
            >
              <IoIosArrowBack className="lg:text-xl text-sm" />
              <h1 className="lg:text-xl text-sm  font-[700] ">Back</h1>
            </button>

            <button
              onClick={handleNextPage}
              className="flex items-center gap-1 text-gray-800 hover:text-blue-500 duration-30"
            >
              <h1 className="lg:text-xl text-sm font-[700]">Next</h1>
              <IoIosArrowForward className="lg:text-xl text-sm" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Board;
