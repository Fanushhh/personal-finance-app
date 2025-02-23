import Image from "next/image";

export const Transaction = ({ src, name, category, date, amount }) => {
    const adjustedDate = new Date(date).toLocaleDateString();
    const updatedAmount = amount > 0 ? `+$${amount}` : amount.replace("-", "-$");
  return (
    <>
   
      <div className=" items-center py-4 justify-items-center grid grid-cols-4 gap-4 max-[600px]:hidden">
        
        <div className="flex items-center place-self-start gap-4">
          <Image
            className="rounded-full"
            src={src.substr(1)}
            alt={name}
            width={50}
            height={50}
          />
          <p className=" font-bold">{name}</p>
        </div>

        <p className="preset-4 text-(--gray-500)">{category}</p>
        <p className="preset-4 text-(--gray-500)">{adjustedDate}</p>

        <p
          className="font-bold"
          style={{ color: amount > 0 ? "var(--green)" : "black" }}
        >{`${updatedAmount}`}</p>
      </div>
      <div className=" items-center py-4 justify-items-normal grid grid-cols-4 gap-2 min-[601px]:hidden">
        <div className="flex items-center place-self-start gap-4 col-span-3">
          <Image
            className="rounded-full"
            src={src.substr(1)}
            alt={name}
            width={50}
            height={50}
          />
          <div>
            <p className=" font-bold">{name}</p>
            <p className="preset-4 text-(--gray-500)">{category}</p>
          </div>
        </div>

        <div className="flex items-end flex-col">
          <p
            className="font-bold"
            style={{ color: amount > 0 ? "var(--green)" : "black" }}
          >{updatedAmount}</p>
          <p className="preset-4 text-(--gray-500)">{adjustedDate}</p>
        </div>
      </div>
    </>
  );
};
