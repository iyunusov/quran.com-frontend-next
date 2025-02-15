import React, { memo } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import IconMenu from '../../../../public/icons/menu.svg';
import IconQ from '../../../../public/icons/Q.svg';
import IconSearch from '../../../../public/icons/search.svg';
import IconSettings from '../../../../public/icons/settings.svg';
import LanguageSelector from '../LanguageSelector';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import SearchDrawer from '../SearchDrawer/SearchDrawer';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';

import styles from './NavbarBody.module.scss';

import Button, { ButtonShape, ButtonSize, ButtonVariant } from 'src/components/dls/Button/Button';
import {
  setIsSearchDrawerOpen,
  setIsNavigationDrawerOpen,
  setIsSettingsDrawerOpen,
} from 'src/redux/slices/navbar';

const NavbarBody: React.FC = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const openNavigationDrawer = () => {
    dispatch({ type: setIsNavigationDrawerOpen.type, payload: true });
  };

  const openSearchDrawer = () => {
    dispatch({ type: setIsSearchDrawerOpen.type, payload: true });
  };

  const openSettingsDrawer = () => {
    dispatch({ type: setIsSettingsDrawerOpen.type, payload: true });
  };
  return (
    <div className={styles.itemsContainer}>
      <div className={styles.centerVertically}>
        <div className={styles.leftCTA}>
          <>
            <Button
              tooltip={t('menu')}
              variant={ButtonVariant.Ghost}
              shape={ButtonShape.Circle}
              onClick={openNavigationDrawer}
            >
              <IconMenu />
            </Button>
            <NavigationDrawer />
          </>
          <Button
            href="/"
            shape={ButtonShape.Circle}
            variant={ButtonVariant.Ghost}
            className={classNames(styles.logoWrapper, styles.QIcon)}
            size={ButtonSize.Large}
            shouldFlipOnRTL={false}
          >
            <IconQ />
          </Button>
          <LanguageSelector />
        </div>
      </div>
      <div className={styles.centerVertically}>
        <div className={styles.rightCTA}>
          <>
            <Button
              tooltip={t('settings.title')}
              shape={ButtonShape.Circle}
              variant={ButtonVariant.Ghost}
              onClick={openSettingsDrawer}
            >
              <IconSettings />
            </Button>
            <SettingsDrawer />
          </>
          <>
            <Button
              tooltip={t('search.title')}
              variant={ButtonVariant.Ghost}
              onClick={openSearchDrawer}
              shape={ButtonShape.Circle}
              shouldFlipOnRTL={false}
            >
              <IconSearch />
            </Button>
            <SearchDrawer />
          </>
        </div>
      </div>
    </div>
  );
};

export default memo(NavbarBody);
