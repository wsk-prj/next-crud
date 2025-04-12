export const Input = {
  Text: ({
    children,
    name,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className=".input-text w-5/6 mx-auto flex flex-col gap-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {children}
        </label>
        <input
          type="text"
          id={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder={children as string}
          required
        />
      </div>
    );
  },
  Textarea: ({
    children,
    name,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }) => {
    return (
      <div className=".input-textarea w-5/6 mx-auto flex flex-col gap-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {children}
        </label>
        <textarea
          id={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 h-72 w-full resize-none"
          placeholder={children as string}
          required
        />
      </div>
    );
  },

  Password: ({
    children,
    name,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className=".input-password w-5/6 mx-auto flex flex-col gap-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {children}
        </label>
        <input
          type="password"
          id={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder={children as string}
          required
        />
      </div>
    );
  },
};
