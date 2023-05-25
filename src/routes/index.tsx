import { component$, useComputed$, useSignal } from "@builder.io/qwik";

const Child = component$((props: { someValue: number[] }) => {
  const max = useComputed$(() => Math.max(...props.someValue));
  return <div>{max.value}</div>;
});

export default component$(() => {
  const data = useSignal<number[] | undefined>([1, 2, 3, 4, 5]);

  return (
    <>
      <div>{data.value && <Child someValue={data.value} />}</div>
      <button onClick$={() => (data.value = undefined)}>Click me</button>
    </>
  );
});
