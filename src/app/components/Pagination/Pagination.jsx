import Image from "next/image";


export const Pagination = ({page, setPage, totalNumberofPages, transactions, isPlaceholderData}) => {
    return(
        <div className="flex justify-between mt-4 items-center">
        
        
            <button
              onClick={() => {
                setPage(page - 1);
            
              }}
              className={` disabled:bg-black! flex border-1 p-4 rounded-md border-(--beige-500) ${page === 0 ? 'bg-black text-white' : ''}`}
              disabled={page === 0}
            >
                <Image src="/assets/images/icon-caret-left.svg" alt="previous icon" width={5} height={5} />
              <span className="max-[1000px]:hidden block ">Previous</span>
            </button>
            
        
        <div className="flex gap-3">
            {totalNumberofPages.map((_, i) => {
                return (
                    <button
                    className={`border-1 border-(--beige-500) disabled:bg-black! p-2 rounded-md ${page== i ? 'bg-black text-white' : ''}`}
                    key={i}
                    onClick={() => {
                        setPage(i);
            
                    }}
                    disabled={page === i}
                    >
                    {i + 1}
                    </button>
                );
            })}
        </div>
        <button
          onClick={() => {
            if (!isPlaceholderData && transactions.hasMore) {
              setPage(page + 1);
              
            }
          }}
          className={`border-1 border-(--beige-500) disabled:bg-black! p-4 rounded-md ${!transactions?.hasMore ? 'bg-black text-white' : ''}`}
          disabled={isPlaceholderData || !transactions?.hasMore}
        >
         <Image src="/assets/images/icon-caret-right.svg" alt="previous icon" width={5} height={5} />
         <span className="max-[1000px]:hidden block ">Next</span>
        </button>
      </div>
    )
}