"use client";

import {
  CalendarDays,
  FileText,
  Link,
  Megaphone,
  Users,
} from "lucide-react";


export default function MemberSidebar() {

  return (

    <aside
      className="
        w-80
        border-l
        border-gray-200
        bg-[#F8FAFC]
        p-5
      "
    >


      <div
        className="
          h-full
          space-y-6
          overflow-y-auto
        "
      >


        {/* Illustration Card */}

        <div
          className="
            flex
            h-44
            items-center
            justify-center
            rounded-3xl
            bg-blue-50
          "
        >

          <div
            className="
              text-7xl
            "
          >
            🌐
          </div>

        </div>



        {/* Community Info */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-5
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            GIMPA Community
          </h2>


          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            Connect with students,
            share ideas, collaborate on
            projects and grow together.
          </p>



          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              text-sm
              text-gray-600
            "
          >

            <Users
              size={18}
              className="text-blue-500"
            />

            1,250 members

          </div>


        </div>





        {/* Announcements */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              gap-2
            "
          >

            <Megaphone
              size={18}
              className="text-blue-500"
            />


            <h3
              className="
                font-semibold
              "
            >
              Announcements
            </h3>

          </div>



          <div
            className="
              space-y-4
              text-sm
            "
          >

            <p className="text-gray-600">
               Mid-semester examinations
              begin next Monday.
            </p>


            <p className="text-gray-600">
               Final year project proposals
              are due this Friday.
            </p>


            <p className="text-gray-600">
               Register for the AI Workshop
              before July 20.
            </p>


          </div>


        </div>






        {/* Upcoming Events */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              gap-2
            "
          >

            <CalendarDays
              size={18}
              className="text-blue-500"
            />

            <h3
              className="
                font-semibold
              "
            >
              Upcoming Events
            </h3>

          </div>



          <div className="space-y-3">


            <div
              className="
                rounded-xl
                bg-blue-50
                p-3
              "
            >

              <p className="font-medium">
                AI Workshop
              </p>

              <p className="text-sm text-gray-500">
                July 20 • 10:00 AM
              </p>

            </div>



            <div
              className="
                rounded-xl
                bg-blue-50
                p-3
              "
            >

              <p className="font-medium">
                Career Talk
              </p>

              <p className="text-sm text-gray-500">
                July 25 • 2:00 PM
              </p>

            </div>


          </div>


        </div>






        {/* Quick Links */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              gap-2
            "
          >

            <FileText
              size={18}
              className="text-blue-500"
            />


            <h3 className="font-semibold">
              Quick Links
            </h3>


          </div>



          <div
            className="
              space-y-3
              text-sm
            "
          >

            <p className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Student Handbook
            </p>


            <p className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Lecture Notes
            </p>


            <p className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Academic Calendar
            </p>


            <p className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Project Repository
            </p>


          </div>


        </div>



      </div>


    </aside>

  );
}