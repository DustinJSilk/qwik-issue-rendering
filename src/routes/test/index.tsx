import {
  Signal,
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

// Track a value change outside of the Qwik renderer and optimizer
const Issue4332Global = globalThis as any as { issue4332: number };

export const Issue4332Child = component$(
  (props: { data: Signal<number | undefined> }) => {
    const computeTest = useComputed$(() => {
      Issue4332Global.issue4332 = 1;
      return props.data.value;
    });

    return <>{computeTest.value}</>;
  }
);

export const Issue4332 = component$(() => {
  const data = useSignal<number | undefined>(1);

  useVisibleTask$(() => {
    Issue4332Global.issue4332 = 0;
  });

  return (
    <>
      <button id="issue-4332-trigger" onClick$={() => (data.value = undefined)}>
        Trigger
      </button>

      {!!data.value && <Issue4332Child data={data} />}

      <div id="issue-4332-result">
        {!data.value && Issue4332Global.issue4332}
      </div>
    </>
  );
});

export default component$(() => {
  return <Issue4332 />;
});
