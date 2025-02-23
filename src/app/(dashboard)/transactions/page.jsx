import { TransactionList } from "@/app/components/TransactionList/TransactionList";


export default async function Page(){
    
    return (
        <div className="flex w-full flex-col px-4 py-6 md:p-10 max-[600px]:mb-10 bg-(--beige-100)">
        <h1 className="preset-1">Transactions</h1>
        <TransactionList />
        </div>
    );
}