import { FC } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface PromptProps {
  isOpen?: boolean;
  onClickReload?: () => void;
}

const UPDATE_INTERVAL_IN_MS = 20_000;

const ReloadPrompt: FC<PromptProps> = ({ isOpen = false, onClickReload }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <span>New content available, click on reload button to update.</span>
      </div>
      <button onClick={() => onClickReload?.()}>Reload</button>
    </div>
  );
};

const ServiceWorkerWithPrompt: FC = () => {
  const onRegistered = (
    registration: ServiceWorkerRegistration | undefined
  ): void => {
    if (registration) {
      setInterval(() => {
        registration.update().then();
      }, UPDATE_INTERVAL_IN_MS);
    }
  };

  const onRegisterError = (error: any): void => {
    console.log('SW registration error', error);
  };

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered,
    onRegisterError,
  });

  return (
    <ReloadPrompt
      isOpen={needRefresh}
      onClickReload={() => updateServiceWorker(true)}
    />
  );
};

export default ServiceWorkerWithPrompt;
