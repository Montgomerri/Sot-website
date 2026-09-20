"use client";

export default function ServerSidebar() {
  return (
    <aside
      className="
        w-20
        bg-blue-600
        flex
        flex-col
        items-center
        py-4
        gap-4
      "
    >

      <div
        className="
          h-12
          w-12
          rounded-2xl
          bg-white
          text-blue-600
          flex
          items-center
          justify-center
          font-bold
        "
      >
        G
      </div>


      <div className="
        h-12
        w-12
        rounded-full
        bg-blue-500
        text-white
        flex
        items-center
        justify-center
      ">
        +
      </div>


    </aside>
  );
}