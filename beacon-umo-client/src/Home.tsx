import { message, Modal, notification } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { NotificationInstance } from 'antd/es/notification/interface';
import { FC, ReactNode, useEffect } from 'react';

export let messageApi: MessageInstance = message;
export let modalApi: HookAPI = Modal as unknown as HookAPI;
export let notificationApi: NotificationInstance = notification
const Home: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [messagehook, messageCreate] = message.useMessage();
  const [modalhook, modalCreate] = Modal.useModal();
  const [notificationhook, notificationCreate] = notification.useNotification({
    stack: {
      threshold: 3,
    },
  });

  useEffect(() => {
    modalApi = modalhook;
    messageApi = messagehook;
    notificationApi = notificationhook;
  }, []);

  return (
    <>
      {messageCreate}
      {modalCreate}
      {notificationCreate}
      {children}
    </>

  );
};
export default Home;
