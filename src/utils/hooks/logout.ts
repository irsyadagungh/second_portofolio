import { deleteCookie } from "cookies-next/client";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    deleteCookie("adminAuth");
    router.push("/admin");
  };

  return logout;
}
