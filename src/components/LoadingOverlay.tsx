import { LoadingSpinner } from "./LoadingSpinner";
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingOverlay = ({
  isLoading,
  children,
}: LoadingOverlayProps) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
      <div>{children}</div>
    </div>
  );
};
