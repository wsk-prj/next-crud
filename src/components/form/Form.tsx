export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className=".form w-full flex flex-col gap-y-4" onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};
