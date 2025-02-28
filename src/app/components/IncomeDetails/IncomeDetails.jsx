

export const IncomeDetails = async() => {
    return(
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 *:p-6 *:rounded-xl max-w-[1000px]">
            <div className="bg-black text-white">
                <p className="preset-4 mb-3">Current balance</p>
                <p className="preset-1">$4,836.00</p>
            </div>
            <div className="bg-white">
                <p className="preset-4 mb-3">Income</p>
                <p className="preset-1">$3,814.25</p>
            </div>
            <div className="bg-white">
                <p className="preset-4 mb-3">Current balance</p>
                <p className="preset-1">$1,700.50</p>
            </div>
        </section>
    )
}