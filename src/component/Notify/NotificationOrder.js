import React, { useState } from 'react';
import clsx from 'clsx'
import style from './notify.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'

const NotificationOrrder = () => {
  

  const notificationContainer = clsx(style.notificationContainer)
  const notification = clsx(style.notification)

  return (
    <div className={notificationContainer}>
        <div className={notification}>
            <FontAwesomeIcon icon={faBell} style={{paddingRight:'8px'}}/>
            Có đơn hàng mới!
        </div>
    </div>
  );
};

export default NotificationOrrder;
