"use client";

import {
  Home,
  MessageCircle,
  Megaphone,
  Code2,
  GraduationCap,
  Shuffle,
  BookOpen,
  FileText,
  Link2,
} from "lucide-react";


const communityItems = [
  {
    name: "Lobby",
    icon: MessageCircle,
    active: true,
  },
  {
    name: "Announcements",
    icon: Megaphone,
  },
  {
    name: "Programming",
    icon: Code2,
  },
  
  {
    name: "Random",
    icon: Shuffle,
  },
];


const resourceItems = [
  {
    name: "Courses",
    icon: BookOpen,
  },
  {
    name: "Documents",
    icon: FileText,
  },
  {
    name: "Useful Links",
    icon: Link2,
  },
];


function SidebarItem({
  item,
}: {
  item: any;
}) {

  const Icon = item.icon;


  return (

    <button
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        transition-all

        ${
          item.active
          ?
          "bg-blue-100 text-blue-700 font-semibold"
          :
          "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >

      <Icon size={18}/>

      {item.name}


    </button>

  );

}



export default function ChannelSidebar() {


  return (

    <aside
      className="
        w-72
        border-r
        border-gray-200
        bg-white
        px-4
        py-6
      "
    >


      <div
        className="
          mb-8
          flex
          items-center
          gap-3
          px-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-500
            font-bold
            text-white
          "
        >
          G
        </div>


        <div>

          <h2
            className="
              font-semibold
              text-gray-900
            "
          >
            GIMPA
          </h2>


          <p
            className="
              text-xs
              text-gray-500
            "
          >
            Community
          </p>


        </div>


      </div>





      <div className="space-y-1">


        <h3
          className="
            mb-3
            px-3
            text-xs
            font-semibold
            uppercase
            text-gray-400
          "
        >
          Community
        </h3>


        {
          communityItems.map((item)=>(

            <SidebarItem
              key={item.name}
              item={item}
            />

          ))
        }


      </div>






      <div
        className="
          mt-8
          space-y-1
        "
      >

        <h3
          className="
            mb-3
            px-3
            text-xs
            font-semibold
            uppercase
            text-gray-400
          "
        >
          Resources
        </h3>


        {
          resourceItems.map((item)=>(

            <SidebarItem
              key={item.name}
              item={item}
            />

          ))
        }


      </div>




    </aside>

  );

}