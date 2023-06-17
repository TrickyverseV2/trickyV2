import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import "@/styles/login-signup.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  var router = useRouter();
  return (
    <div className="flex w-full h-full">
      {router.pathname !== "/login" ? (
        <>
          <div className="fixed ">
            <Sidebar />
          </div>
          <div className="w-[18rem]"></div>
        </>
      ) : (
        <></>
      )}
      <Component {...pageProps} />
    </div>
  );
}
