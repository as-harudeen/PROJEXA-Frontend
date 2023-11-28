import { Nav } from "@components/auth/Nav/Nav";
import { Button } from "@components/custom/Button";
import { FC } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export const LandingPage: FC = () => {
  return (
    <>
      <Nav />
      <div className=" text-white px-16 py-12">
        <section>
          <div className="flex justify-center h-[300px] items-center">
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-4xl font-poppins">
                Welcome to PROJEXA
              </h1>
              <h3 className="font-semibold text-2xl font-nunito">
                Your Ultimate Project Management Solution
              </h3>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-center">
          <Link to="/auth/login">
              <Button>Get Started</Button>
            </Link>

          </div>
        </section>

        <section>
          <div className="flex gap-8  p-12 font-poppins">
            <div className="flex flex-wrap gap-5 w-[50%]">
              <div className="bg-hash_two rounded-xl p-24  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Personal Project Management Made Simple
                  </h4>
                  <span>
                    Unlock the power of individual productivity with PROJEXA's
                    Personal Project feature. Seamlessly create and manage your
                    projects while keeping all relevant reference links in one
                    centralized location. Tailor your workspace to your unique
                    needs and stay organized effortlessly.
                  </span>
                </div>
              </div>
              <div className="bg-hash_two rounded-xl p-24  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Navigate Your Projects with Spaces
                  </h4>
                  <span>
                    Experience project organization like never before with
                    Spaces. Divide your projects into stages and break down
                    tasks effortlessly. Our intuitive drag-and-drop
                    functionality allows you to fluidly arrange tasks within
                    stages, adapting to your evolving project dynamics.
                  </span>
                </div>
              </div>
            </div>
            <div className="border rounded-xl flex-1"></div>
          </div>
          <div className="flex gap-8  p-12 font-poppins">
            <div className="border rounded-xl flex-1"></div>

            <div className="flex flex-wrap gap-5 w-[50%]">
              <div className="bg-hash_two rounded-xl p-8 w-[45%]  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Collaborate Effectively with Teams
                  </h4>
                  <span>
                    Initiate and lead teams effortlessly with PROJEXA's Team
                    feature. As the Team Admin, invite members to join,
                    fostering a collaborative environment. Team Leads can take
                    charge, creating Team Projects and efficiently assigning
                    tasks through the Task Distribution Center.
                  </span>
                </div>
              </div>
              <div className="bg-hash_two rounded-xl p-8 w-[45%]  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Dynamic Task Distribution Board
                  </h4>
                  <span>
                    Craft your project journey on the Task Distribution Board.
                    Create customizable stages and tasks that align with your
                    team's workflow. Below, use the intuitive drag-and-drop
                    interface to assign tasks to team members, optimizing
                    project coordination.
                  </span>
                </div>
              </div>
              <div className="bg-hash_two rounded-xl p-8 w-[45%]  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Real-time Team Collaboration
                  </h4>
                  <span>
                    Fuel seamless communication within your team through the
                    Team Chat feature. Discuss ideas, share updates, and
                    maintain a cohesive team environment. PROJEXA is not just a
                    project management tool; it's a platform for collaboration.
                  </span>
                </div>
              </div>
              <div className="bg-hash_two rounded-xl p-8 w-[45%]  h-full] flex gap-4">
                <div className=" ">
                  <h4 className="font-semibold text-xl mb-5">
                    Elevate Communication with Video Calls
                  </h4>
                  <span>
                    Break down communication barriers with our in-built video
                    call feature. Connect with team members instantly, allowing
                    for face-to-face discussions that enhance collaboration and
                    understanding.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-12 flex ">
          <div className="max-w-[700px]">
            <h3 className="font-semibold text-xl my-2">
              Ready to Transform Your Project Management Experience?
            </h3>
            <span>
              Sign up for PROJEXA today and embark on a journey of seamless
              collaboration, efficient task management, and elevated
              productivity. Experience project management like never before.
            </span>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Link to="/auth/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </section>
        <footer className="border-t-2  h-[100px] flex justify-evenly items-center ">
          <div className="flex gap-3 font-ligh text-sm">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Copyright@ 2023 achubsl</span>
          </div>
          <div className="flex gap-3">
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaGithub />{" "}
            </span>
            <span>
              <FaLinkedin />
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};
