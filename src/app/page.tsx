import Link from "next/link";

export default function Home() {
  return (
    <div className="homePage">
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
