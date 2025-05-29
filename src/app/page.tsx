import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to the Todo App</h1>
      <div>
        <Link href={"/login"}>
          <button>LogIn</button>
        </Link>
        <Link href={"/signin"}>
          <button>Signin</button>
        </Link>
      </div>  
    </div>
  );
}
