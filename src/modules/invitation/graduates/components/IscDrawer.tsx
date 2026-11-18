import React from 'react';
import { Drawer } from '@/common/components/drawer/Drawer';
import { useGraduates } from '@/common/hooks';

export const IscDrawer: React.FC = () => {
    const { getGraduatesByCareer } = useGraduates();
    const iscCareer = getGraduatesByCareer('isc');

    return (
        <Drawer>
            <span className="drawer-monogram" aria-hidden="true">ISC</span>

            <div className="drawer-career-card">
                <div className="drawer-career-card__headline">
                    <span className="drawer-career-card__headline-word">EGRESADOS</span>
                    <span className="drawer-career-card__headline-the">de</span>
                    <span className="drawer-career-card__headline-word">2026</span>
                </div>
                <p className="drawer-career-card__name">
                    Ingeniería en<br />Sistemas Computacionales
                </p>
                <p className="drawer-career-card__date">Generación 2022 – 2026</p>
            </div>

            <div className="graduates-drawer__body">
                {iscCareer.graduates.length > 0 ? (
                    <ul className="graduates-drawer__list">
                        {iscCareer.graduates.map((grad) => (
                            <li key={grad.id} className="graduates-drawer__item">
                                {grad.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="graduates-drawer__empty">Próximamente...</p>
                )}
            </div>

            <span className="drawer-monogram" aria-hidden="true">ISC</span>
        </Drawer>
    );
};
