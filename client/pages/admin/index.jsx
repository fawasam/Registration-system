import { useEffect } from "react";
import { authenticate, isAuth } from "../../utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const Admin = () => {
  const router = useRouter();
  console.log(isAuth());
  useEffect(() => {
    if (isAuth() && isAuth().role !== "admin") {
      router.push("/");
    } else if (!isAuth()) {
      router.push("/");
    }
  }, [isAuth]);
  return <div>Admin</div>;
};

export default Admin;
