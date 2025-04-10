export const ErrorBox = ({ error }: { error: string }) => {
  return <div className=".error-box h-4 mx-auto text-red-500">{error}</div>;
};
