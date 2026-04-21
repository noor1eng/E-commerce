// replace
import img from "../assets/404 error with people holding the numbers-cuate.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage1 = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 p-5 ">
      <img
        src={img}
        alt="placeholder image"
        className="aspect-video w-[700px] rounded-xl object-cover dark:brightness-[0.95] dark:invert"
      />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
        <p>Oops! The page you're trying to access doesn't exist.</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Link to="/">
            <Button className="h-9 px-4 py-2 cursor-pointer">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage1;
