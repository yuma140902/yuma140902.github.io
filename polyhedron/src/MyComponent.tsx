import type React from 'react';

export type MyComponentProps = {
  a: number;
  b: number;
};

export const MyComponent: React.FC<MyComponentProps> = (
  props: MyComponentProps,
) => {
  const ans = props.a + props.b;
  return (
    <div>
      add({props.a}, {props.b}) → {ans}
    </div>
  );
};
