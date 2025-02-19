import { useQueryClient } from "@tanstack/react-query";
import { useActionState } from "react";
import React from "react";
import { editPot } from "@/app/actions/pots";
const options = [
  { value: "", label: "Select a color" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "cyan", label: "Cyan" },
  { value: "navy", label: "Navy" },
  { value: "red", label: "Red" },
  { value: "purple", label: "Purple" },
  { value: "turquoise", label: "Turquoise" },
  { value: "blue", label: "Blue" },
  { value: "orange", label: "Orange" },
];

export const EditPotForm = ({
  id,
  potName,
  target,
  colorPref,
  closeModal,
}) => {
  const queryClient = useQueryClient();

  const [message, formAction] = useActionState(editPot, undefined);

  const [potData, setPotData] = React.useState({
    potName,
    target,
    colorPref,
  });
  React.useEffect(() => {
    if (message?.success) {
      queryClient.invalidateQueries("pots");
      closeModal();
    }
  }, [message, closeModal, queryClient]);

  const handleChange = (e) => {
    setPotData({
      ...potData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="relative flex-col w-full max-w-[540px] gap-4  bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div className="max-w-[500px]">
          <h1 className="preset-1 mb-4">Edit {potName}</h1>
          <p className="preset-4 text-[var(--beige-500)]">
            As your budgets change, feel free to update your spending limits.
          </p>
        </div>
      </div>

      <form action={formAction} className="*:flex *:flex-col ">
        <input type="hidden" name="potId" value={id} />
        <div>
          <label htmlFor="potName">Pot name</label>
          <input
            value={potData.potName}
            onChange={handleChange}
            placeholder="$ e.g. Rainy days"
            type="text"
            id="potName"
            name="potName"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="maxSpend">Maximum Spend</label>
          <input
            value={potData.target}
            onChange={handleChange}
            placeholder="$ e.g. 2000"
            type="text"
            id="target"
            name="target"
            autoComplete="off"
          />
        </div>
        <div className="">
          <label htmlFor="colorPref">Theme</label>
          <select
            value={potData.colorPref}
            onChange={handleChange}
            name="colorPref"
            id="colorPref"
            className="px-6 relative"
          >
            {options.map((option) => (
              <option
                className=""
                key={option.value}
                style={{ color: `var(--${option.value})` }}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};
