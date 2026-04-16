//rebuild
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
export default function Edituser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [able, disable] = useState(true);
  const [role, setRole] = useState("");
  const pathID = useParams().id; // get the id reach from url instead of spliting the url
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}/${pathID}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);

        disable(false);
      })
      .catch((err) => {
        nav("/dashboard/users/page/404", { replace: true });
      });
  }, []);

  async function UpdateUser(e) {
    e.preventDefault();
    try {
      await Axios.post(`${USER}/edit/${pathID}`, {
        name: name,
        email: email,
        role: role,
        // eslint-disable-next-line no-unused-vars
      }).then((res) => {
        window.location.pathname = "/dashboard/users";
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-[110vh] bg-[#00000047] absolute top-0 left-0 flex justify-center items-center">
      <div className="relative flex flex-col rounded-md bg-white p-5">
        <MdClose
          className="ml-auto text-gray-700 hover:text-black"
          onClick={() => {
            nav("/dashboard/users");
          }}
        />
        <h4 className="block text-xl font-medium text-black">Edit User</h4>
        <p className="text-slate-500 font-light">
          Update the user here. Click save when you're done.
        </p>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={UpdateUser}
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-black">Your Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Name"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-black">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div class="w-30 max-w-sm  mt-5">
            <label className="block mb-2 text-sm text-black">Role:</label>

            <div class="relative">
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="w-full bg-transparent mb-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              >
                <option value="1995">Admin</option>
                <option value="2001">User</option>
                <option value="1996">Whriter</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                class="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>

          <Button
            className="mt-6 w-30 block ml-auto rounded-md bg-black py-1.5 px-3 border border-transparent  text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={able}
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
