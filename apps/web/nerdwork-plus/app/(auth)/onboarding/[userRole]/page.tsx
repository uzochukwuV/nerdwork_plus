import React, { use } from "react";
import ReaderOnboarding from "../../_components/ReaderOnboarding";
import CreatorOnboarding from "../../_components/CreatorOnboarding";

const UserOnboarding = ({
  params,
}: {
  params: Promise<{ userRole: string }>;
}) => {
  const { userRole } = use(params);
  return (
    <>{userRole == "reader" ? <ReaderOnboarding /> : <CreatorOnboarding />}</>
  );
};

export default UserOnboarding;
