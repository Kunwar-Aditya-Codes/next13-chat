import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async ({}) => {
  // const session = await getServerSession();

  // console.log(session);

  return (
    <div>
      <Link href="/dashboard/add">
        <p className="bg-black px-4 py-2 m-6 rounded-xl w-fit text-white">
          Add
        </p>
      </Link>
    </div>
  );
};

export default page;
