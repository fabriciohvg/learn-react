import StateToAction from "./1-state-to-action";
import MultipleActionTypes from "./2-multiple-action-type";
import OptimisticUI from "./3-optimistic-ui";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">useActionState</h1>
      <p>
        The <code>useActionState</code> is a React Hook that lets you update
        state with side effects using Actions.
      </p>
      <StateToAction />
      <MultipleActionTypes />
      <OptimisticUI />
    </div>
  );
}
