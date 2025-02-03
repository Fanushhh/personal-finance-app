import SVGIcon from "../SVGIcon/SVGIcon"

export const MinimizeButton = ({minimizeButton, minimized}) => {
    return (
        <button
        onClick={() => minimizeButton(!minimized)}
        className={`text-[var(--gray-500)] self-end font-bold flex gap-4 items-center ${
          minimized ? "rotate-180" : ""
        }`}
      >
        <SVGIcon iconName={minimized ? "iconMinMenu" : "iconMinMenu"} />
        {minimized ? "" : "Minimize Menu"}
      </button>
    )
}