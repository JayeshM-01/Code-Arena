import { Suspense } from "react";
import UpdateFun from "@components/UpdateFun";

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateFun />
    </Suspense>
  );
};

export default UpdatePrompt;
