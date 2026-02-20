
/**
 * Dropdown arrow component that rotates based on the open/closed state of the dropdown menu
 * 
 * @param {boolean} menuOpen - Whether the dropdown menu is currently open
 * @param {number} defaultRotateAngle - The default rotation angle of the arrow when the menu is closed (in degrees, e.g., -90, 0, 90, 180)
 * @param {number} rotateAngle - The final angle of the arrow when the menu is open (in degrees, e.g., -90, 0, 90, 180) 
 * @returns 
 */
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