import { PotsHeader } from "@/app/components/PotsHeader/PotsHeader";
import { PotsList } from "@/app/components/PotsList/PotsList";

export default function Page(){
    return (
        <div className="flex w-full  bg-(--beige-100) flex-col px-4 py-6 md:p-10 max-[600px]:mb-10">
        <PotsHeader />
        <PotsList />
        </div>
    );
}