import React from "react";

const List = ({ item, index }) => {
  return (
    <section key={index}>
      <div className="w-full lg:h-[60px] h-auto rounded-xl p-5 flex items-center hover:bg-gray-100 duration-300 cursor-pointer">
        <section className="flex-1 lg:text-sm text-xs">{item.id}</section>
        <section className="flex-1 lg:text-sm text-xs pl-10">
          {item.product}
        </section>
        <section className="flex-1 flex justify-center lg:text-sm text-xs">
          {item.price}
        </section>
        <section className="flex-1 flex justify-center lg:text-sm text-xs">
          {item.brand ? item.brand : "None"}
        </section>
      </div>

      <div className="w-full flex justify-center">
        <hr className="w-[98%] border-[1px] border-gray-100" />
      </div>
    </section>
  );
};

export default List;
