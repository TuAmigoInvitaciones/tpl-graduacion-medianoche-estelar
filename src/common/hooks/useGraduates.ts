import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useGraduates = () => {
    const { careers } = useSelector((state: RootState) => state.graduates);

        const getGraduatesByCareer = (careerKey: keyof typeof careers) => {
            return careers[careerKey];
        };

        return {
            careers,
            getGraduatesByCareer
        };
    };
