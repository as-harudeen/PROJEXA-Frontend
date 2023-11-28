import { useFetch } from "@hooks/useFetch";
import { useQuery } from "@tanstack/react-query";


type TeamActivityLogsResponse = {
    team_activity_log_id: string;
    log_text: string;
    logged_at: string;
}[];

export const useTeamActivityLog = (team_id: string) => {
    const {getRequest} = useFetch();
    const teamActivityLogQuery = useQuery({
        queryKey: ["team", "activity-log"],
        queryFn: async () => {
            const resoponse = await getRequest(`team/activity-logs/${team_id}`);
            // return resoponse.data as TeamActivityLogsResponse;
            const data = await resoponse.json() as TeamActivityLogsResponse;
            console.log(data);
            return data;
        },

    })

    return {
        teamActivityLogQuery
    }
}