import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import { UsersShow } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import { MdOutlinePersonAdd } from "react-icons/md";
import { Button } from "../ui/button";
import Table from "./Table";

export default function Users() {
  //states
  const [user, setUser] = useState([]);
  const [noUser, setNouser] = useState(false);
  const [rand, rerand] = useState(false);
  const [CurrentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  //states

  //get all user
  useEffect(() => {
    Axios.get(`/${UsersShow}?limit=${limit}&page=${page}`)
      .then((res) => {
        setUser(res.data.data);
        setTotal(res.data.total);
        setNouser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rand, limit, page]);
  // get all user

  //get current user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, []);
  //get current user

  // header
  const header = [
    {
      key: "id",
      name: "ID",
    },
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  // header
  return (
    <>
      <h1
        className="font-bold text-[25px] text-black"
        style={{ wordSpacing: "-3px" }}
      >
        User List
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <p className="text-slate-400 ">
          Manage your users and their roles here.
        </p>
        <Link to="/dashboard/users/adduser">
          <Button
            className=" w-30 block rounded-md bg-black py-1.5 px-3 border border-transparent  text-sm text-white font-semibold transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <div className="flex items-center justify-between">
              Add User
              <MdOutlinePersonAdd className="text-[16px] ml-2" />
            </div>
          </Button>
        </Link>
      </div>
      <Table
        header={header}
        data={user}
        CurrentUser={CurrentUser}
        rerand={rerand}
        deletee={USER}
        noUser={noUser}
        add="users"
        limit={limit}
        page={page}
        setPage={setPage}
        total={total}
      />
    </>
  );
}
