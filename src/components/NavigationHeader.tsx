import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationHeaderProps {
  activePage: string;
  primaryText: string;
  secondaryText: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activePage,
  primaryText,
  secondaryText,
}) => {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    navigate(page);
  };

  return (
    <div className="
        flex 
        justify-center
    ">
        <div className="
            flex 
            flex-row
            text-2xl 
            font-bold
            pt-8
            pb-4
            gap-8
        ">
            <div
                className={`p-2 cursor-pointer ${
                activePage === primaryText ? 'text-black' : 'text-gray-400'
                }`}
                onClick={() => navigateToPage('/')}
            >
                {primaryText}
            </div>
            <div
                className={`p-2 cursor-pointer ${
                activePage === secondaryText ? 'text-black' : 'text-gray-400'
                }`}
                onClick={() => navigateToPage('/cars')}
            >
                {secondaryText}
            </div>
        </div>
    </div>
  );
};

export default NavigationHeader;
