import { Login } from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Auth/Register";
import { ProjectDetails } from "./pages/Personal-Project/ProjectDetails";
import { AuthRoute } from "./utils/AuthRoute";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ProjectSpace } from "@pages/Personal-Project/ProjectSpace";

import "./App.css";
import { Settings } from "@pages/user/Settings";
import { Profile } from "@pages/user/Profile";
import { IndividualProfile } from "@pages/user/IndividualProfile";
import { Connections } from "@pages/user/Connections";
import { Following } from "@pages/user/Following";
import { Followers } from "@pages/user/Followers";
import { TeamOverview } from "@pages/Team/Team-Overview";
import { InitiateTeam } from "@pages/Team/InitiateTeam";
import { TeamDetails } from "@pages/Team/TeamDetails/TeamDetails";
import { TeamProjectOverview } from "@pages/Team/TeamProject/Team-Project-Overview";
import { PersonalProjectOverview } from "@pages/Personal-Project/Personal-Project-Overview";
import { NewTeamProject } from "@pages/Team/TeamProject/NewTeamProject";
import { TeamProjectDetails } from "@pages/Team/TeamProject/Team-Project-Details";
import { TaskDistributionCenter } from "@pages/Team/TeamProject/TaskDistributionCenter";
import { TeamProjectSpace } from "@pages/Team/TeamProject/Team-Project-Space";
import { TeamChat } from "@pages/Team/Chat/TeamChat";
import { TeamVideoCall } from "@pages/Team/Chat/TeamVideoCall";
import { EditTeam } from "@pages/Team/TeamDetails/EditTeam";
import { LandingPage } from "@pages/LandingPage";
import { NewPersonalProject } from "@pages/Personal-Project/NewPersonalProject";
import { NotFound } from "@pages/404";

export const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/:user_name" element={<IndividualProfile />}>
          <Route path="following" element={<Following />} />
          <Route path="followers" element={<Followers />} />
        </Route>

        <Route path="/connections" element={<Connections />} />

        <Route path="project">
          <Route path="personal">
            <Route index element={<PersonalProjectOverview />} />

            <Route path="new" element={<NewPersonalProject />} />

            <Route path=":project_id">
              <Route index element={<ProjectDetails />} />
              <Route path="space" element={<ProjectSpace />} />
            </Route>
          </Route>
        </Route>

        <Route path="team">
          <Route index element={<TeamOverview />} />
          <Route path="initiate-team" element={<InitiateTeam />} />
          <Route path=":team_id">
            <Route index element={<TeamDetails />} />
            <Route path="edit" element={<EditTeam />} />
            <Route path="projects">
              <Route index element={<TeamProjectOverview />} />
              <Route path="new" element={<NewTeamProject />} />
              <Route path=":project_id">
                <Route index element={<TeamProjectDetails />} />
                <Route
                  path="task-distribution"
                  element={<TaskDistributionCenter />}
                />
                <Route path="space" element={<TeamProjectSpace />} />
              </Route>
            </Route>
            <Route path="chat">
              <Route index element={<TeamChat />} />
              <Route path=":video-call/:room_id" element={<TeamVideoCall />} />
            </Route>
          </Route>
        </Route>
        <Route />
        <Route path="user">
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
