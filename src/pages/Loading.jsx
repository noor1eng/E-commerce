import { Spinner } from "@/components/ui/spinner";
export default function Loading() {
  return (
    <div className=" absolute w-full h-full top-0 left-0 z-10 flex justify-center items-center bg-[#0000005e]">
      <Spinner className="text-slate-800 size-5" />
    </div>
  );
}
