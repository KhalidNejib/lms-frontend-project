type Props = {
    message: string;
  };
  
  const ErrorMessage = ({ message }: Props) => {
    return (
      <div className="text-red-500 text-sm mt-2 text-center">
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;
  