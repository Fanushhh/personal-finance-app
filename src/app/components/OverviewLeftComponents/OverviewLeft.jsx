import { PotsSummary } from "../PotsSummary/PotsSummary"
import { TransactionsSummary } from "../TransactionsSummary/TransactionsSummary"


export const OverviewLeft = () => {
    return (<section className="col-span-full lg:col-span-7">
        <PotsSummary />
        <TransactionsSummary />
        
    </section>)
}