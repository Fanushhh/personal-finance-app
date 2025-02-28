
import { DonutChartOverview } from "../DonutChartOverview/DonutChartOverview"
import { RecurringOverview } from "../RecurringOverview/RecurringOverview"



export const OverviewRight = async() =>{ 

    return(
        <aside className=" col-span-full lg:col-span-5">
            <DonutChartOverview />
            <RecurringOverview />
        </aside>
    )
}