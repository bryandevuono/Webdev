import { useState } from "react";

interface PropsProps {
  number: Number;
  message: string;
}

const Props = ({ number, message }: PropsProps): JSX.Element => {
  const [num, setNum] = useState<Number>;
  const n = number.toString;

  const handleUpdate = () => {};
  return (
    <div>
      <p>{message}</p>
      <p>{n()}</p>
      <button />
    </div>
  );
};

export default Props;
