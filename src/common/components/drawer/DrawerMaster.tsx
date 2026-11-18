import React from 'react';
import { useDrawer } from '@/common/hooks';
import { DRAWER_NAMES } from '@/store/ui/drawer.slice';
import { IscDrawer } from '@/modules/invitation/graduates/components/IscDrawer';

export const DrawerMaster: React.FC = () => {
    const { isOpen, drawerName } = useDrawer();

    if (!isOpen) return null;

    return (
        <>
            {drawerName === DRAWER_NAMES.isc && <IscDrawer />}
        </>
    );
};
