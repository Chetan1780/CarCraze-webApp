import React from 'react'
import {
    FaClipboardList,
    FaTag,
    FaDollarSign,
    FaMoneyBillAlt,
    FaCar,
    FaCheckCircle,
    FaIndustry,
    FaCarSide,
    FaCalendarAlt,
    FaRoad,
    FaCogs,
    FaGasPump,
    FaTachometerAlt,
    FaWrench,
    FaCircle,
    FaPalette,
    FaDoorClosed,
    FaIdCard,
    FaTags,
    FaFileAlt,
} from 'react-icons/fa';

const IconField = ({icon}) => {
    const iconMapping = {
        FaClipboardList: <FaClipboardList />,
        FaTag: <FaTag />,
        FaDollarSign: <FaDollarSign />,
        FaMoneyBillAlt: <FaMoneyBillAlt />,
        FaCar: <FaCar />,
        FaCheckCircle: <FaCheckCircle />,
        FaIndustry: <FaIndustry />,
        FaCarSide: <FaCarSide />,
        FaCalendarAlt: <FaCalendarAlt />,
        FaRoad: <FaRoad />,
        FaCogs: <FaCogs />,
        FaGasPump: <FaGasPump />,
        FaTachometerAlt: <FaTachometerAlt />,
        FaWrench: <FaWrench />,
        FaCircle: <FaCircle />,
        FaPalette: <FaPalette />,
        FaDoorClosed: <FaDoorClosed />,
        FaIdCard: <FaIdCard />,
        FaTags: <FaTags />,
        FaFileAlt: <FaFileAlt />,
    };
    return (
        <div className='text-primary bg-blue-100 p-2 rounded-full'>
            {iconMapping[icon]}
        </div>
    )
}

export default IconField
