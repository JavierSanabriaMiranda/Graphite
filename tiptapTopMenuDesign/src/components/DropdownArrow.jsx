const DropdownArrow = ({ menuOpen, defaultRotateAngle = -90, rotateAngle = 180 }) => {

    const rotations = {
        90: 'rotate-90',
        180: 'rotate-180',
        [-90]: '-rotate-90',
        0: 'rotate-0'
    };

    const rotationClass = menuOpen ? rotations[rotateAngle] : rotations[defaultRotateAngle];

    return (
        <svg
            className={`w-4 h-4 text-gray-400 dark:text-zinc-500 transition-transform duration-200 ${rotationClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
};

export default DropdownArrow;