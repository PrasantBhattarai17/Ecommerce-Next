
// import { FaStar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaAccusoft } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaRocket } from "react-icons/fa";
import { MdOutlineSupport } from "react-icons/md";
const iconCss = 'text-indigo-500 text-4xl mb-5'
const services =[
    {
        id:1,
        icon: <IoMdSettings className={iconCss}/>,
        name: "Easy to setup",
        desc: "Auctor mauris quis viverra dictum sed in euismod id nunc, nulla ut nunc sed sed accumsan, magnis bibendum viverra suspendisse.",
    },{
        id:2,
        icon: <BsFillCollectionFill className={iconCss}/>,
        name: "500+ pre-built websites",
        desc: "Vitae netus nisi, vitae augue duis eu accumsan ut phasellus sit tempor habitasse leo hendrerit amet laoreet ornare posuere justo.",
    },{
        id:3,
        icon: <FaAccusoft className={iconCss}/>,
        name: "Customize without code",
        desc: "Egestas aliquam, enim at consectetur ullamcorper blandit at nisi, viverra sed nullam nisl, lectus est viverra ultrices accumsan viverra vel.",
    },{
        id:4,
        icon: <GrUpdate className={iconCss}/>,
        name: "Regular updates",
        desc: "Vulputate viverra dui condimentum ornare aenean id vitae nulla diam, pharetra ac maecenas in et posuere in vivamus vulputate.",
    },{
        id:5,
        icon: <FaRocket className={iconCss}/>,
        name: "Super fast performance",
        desc: "Sit sit ultrices aliquam aliquam amet, facilisis elit tortor in id tellus tempor, non ullamcorper accumsan, viverra posuere aliquam.",
    },{
        id:6,
        icon: <MdOutlineSupport className={iconCss}/>,
        name: "Outstanding support",
        desc: "Scelerisque odio id urna, nibh feugiat eu amet, interdum quis eu accumsan, mi mattis feugiat iaculis vitae tempus phasellus adipiscing.",
    },
]


export default services;