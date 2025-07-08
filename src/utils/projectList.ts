import ecommerceImage from '../assets/images/e-commerce-frontend.png';
import onlineInventory from '../assets/images/online-inventory.png';
import stateInventory from '../assets/images/stateIMS.png';
import combiuniverse from '../assets/images/combiuniversecover.png';
import atechcover from '../assets/images/atech_cover.png';
import digisolcover from '../assets/images/digisolcover.png';
import lostItemscover from '../assets/images/lostItemscover.jpeg';
import nullcover from '../assets/images/nullcover.jpg';
import stickynotescover from '../assets/images/stickynotescover.png';
import scoresureCover from '../assets/images/scoresure.png';
// import crowdfundingCover from '../assets/images/crowdfundingcover.png';

export type Technology = 'Next.js' | 'TailwindCSS' | 'Material-UI' | 'Node.js' | 'MongoDB' | 'Context API' | 'Express' | 'TypeScript' | 'React' | 'Nest.js' | 'Fapshi' | 'Material UI' | 'Context' | 'JWT' | 'React Native' | 'Angular' | 'Bootstrap' | 'Python' | 'JavaScript' | 'C' | 'Java' | 'Dart' | 'MySQL' | 'PostgreSQL' | 'Firebase' | 'Git' | 'Docker' | 'Figma' | 'MUI-X' | 'React Native' | 'Native-Wind' | 'Scikit-learn' | 'Prisma' | 'FastAPI' | 'AI' | 'Solidity' | 'Ethereum' | 'MetaMask' | 'Thirdweb' | 'IPFS' | 'Blockchain' | 'DApp';

export interface Project {
    id: string | number;
    title: string;
    description: string;
    technologies: Technology[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    category: string;
    credentials?: {
        username: string;
        password: string;
    };
    scope?: 'heavy' | 'normal' | 'light',
    accessibility?: 'private' | 'public';
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Application',
        description:
            'A modern e-commerce platform featuring product catalog, shopping cart, user authentication, and secure payment processing. Implements responsive design and real-time inventory updates.',
        technologies: ['React', 'TypeScript', 'Nest.js', 'MongoDB', 'Fapshi', 'Material UI', 'Context', 'JWT'],
        image: ecommerceImage,
        githubUrl: 'https://github.com/Mewoabi/online_store_client',
        liveUrl: 'https://online-store-client-yvah.onrender.com',
        category: 'Fullstack Web Application',
        scope: 'heavy'
    },
    {
        id: 2,
        title: 'Online Store Inventory Management System',
        description:
            'A comprehensive inventory management dashboard with real-time analytics, product/category management, and advanced data visualization. Features include interactive datatables, order tracking, client management, and detailed sales reports.',
        technologies: ['React', 'TypeScript', 'Material-UI', 'Nest.js', 'MUI-X', 'MongoDB'],
        image: onlineInventory,
        githubUrl: 'https://github.com/Mewoabi/online_store_inventory',
        liveUrl: 'https://online-store-inventory.onrender.com',
        category: 'Fullstack Web Application',
        credentials: {
            username: 'doray@gmail.com',
            password: 'doremi',
        },
        scope: 'heavy'
    },
    {
        id: 3,
        title: 'State Information Management System',
        description:
            'This full-stack web application streamlines the tracking, management, and reporting of various state-owned assets including properties, buildings, vehicles, equipment, and documents.The platform features a modern, responsive interface with role-based access control, allowing different government departments to efficiently manage their inventory, track maintenance schedules, and generate detailed reports on asset utilization and status.',
        technologies: ['React', 'TailwindCSS', 'Material-UI', 'Node.js', 'MongoDB', 'Context API', 'Express', 'JavaScript'],
        image: stateInventory,
        githubUrl: 'https://github.com/Mewoabi/State_IMS',
        liveUrl: 'https://state-information-management-system.onrender.com',
        category: 'Fullstack Web Application',
        credentials: {
            username: 'devdore',
            password: 'devdore'
        },
        scope: 'heavy'
    },
    {
        id: 4,
        title: 'Combi Universe - University Past-Questions and Answers provision platform',
        description:
            'A past question and answers papers provision platform where university students can get past questions for free and purchase the answers. Features a very clean and beautiful user interface with a consistent theme, leveraging react-suspense and heavily but consistently animated making the site very interactive and appealing to the target audience',
        technologies: ['Next.js', 'TailwindCSS', 'MongoDB', 'TailwindCSS', 'TypeScript'],
        image: combiuniverse,
        liveUrl: 'https://www.combiuniverse.com/',
        category: 'Fullstack Web Application',
        scope: 'heavy',
        accessibility: 'private'
    },
    {
        id: 5,
        title: 'Advanced Tech Computer Center Website',
        description:
            'React.js frontend for a company website styled with TailwindCSS allowing for a modern and responsive design. The website features a clean layout, showcasing the company\'s services, team, and contact information. It utilizes React Context API for state management, ensuring a smooth user experience. The website was built to ensure responsiveness on screens of all sizes with a nice theme and color palette implemented with TailwindCSS as well reusable components hence an overall feel of consistency throughout all pages of the site',
        technologies: ['React', 'TailwindCSS', 'Context API', 'JavaScript'],
        image: atechcover,
        githubUrl: 'https://github.com/Mewoabi/tech-company-website',
        liveUrl: 'https://tech-company-website-0osa.onrender.com',
        category: 'Frontend Website',
        scope: 'normal'
    },
    {
        id: 6,
        title: 'Digital Solutions Group Website',
        description:
            'React.js frontend for a company website styled with TailwindCSS allowing for a modern and responsive design. The website features a clean layout, showcasing the company\'s services, team, and contact information. It utilizes React Context API for state management, ensuring a smooth user experience. The website was built to ensure responsiveness on screens of all sizes with a nice theme and color palette implemented with TailwindCSS as well reusable components hence an overall feel of consistency throughout all pages of the site',
        technologies: ['React', 'TailwindCSS', 'Context API', 'JavaScript'],
        image: digisolcover,
        liveUrl: 'https://digisol-group-website-la1o120sc.vercel.app/',
        category: 'Frontend Website',
        scope: 'normal',
        accessibility: 'private'
    },
    {
        id: 7,
        title: 'Lost And Found Items Application',
        description:
            'A mobile application built with React Native that allows users to report lost and found lost items. The application also performs image matching on found items stored in Firebase bucket storage and sends notifications to user to inform them about potential matches. The app features a user-friendly interface, real-time notifications, and a secure authentication system. It utilizes TailwindCSS (Native-Wind) for styling and Node.js for the backend, ensuring a smooth and responsive user experience. Other features include, Image capturing, uploading, In app chats, renumeration for found items, application settings, user profile editing, and more.',
        technologies: ['React Native', 'Native-Wind', 'Node.js', 'JavaScript', 'MongoDB', 'Firebase'],
        image: lostItemscover,
        // liveUrl: 'https://digisol-group-website-la1o120sc.vercel.app/',
        githubUrl: 'https://github.com/Mewoabi/CEF440-group-1/tree/merging',
        category: 'Mobile Application',
        scope: 'heavy',
        // accessibility: 'private'
    },
    {
        id: 8,
        title: 'Simple Blog Application',
        description:
            'A simple blog application built with React. The application allows users to create, read, and delete blog posts. It features a clean and minimalistic design, implementing react-core concepts such as state management, component lifecycle, event handling and many others',
        technologies: ['React', 'JavaScript'],
        image: nullcover,
        liveUrl: 'https://simple-blog-m75l.onrender.com',
        githubUrl: 'https://github.com/Mewoabi/simple_blog/tree/portfolio',
        category: 'Frontend Application',
        scope: 'light',
        // accessibility: 'private'
    },
    {
        id: 9,
        title: 'Book Listing Application',
        description:
            'A simple frontend application where a user can create and delete book records. The app is used in demonstrating the combination of context and hooks by creating a book context controlling the books states in the app, thereby allowing users to interact with the book state without passing props',
        technologies: ['React', 'JavaScript', 'Context API'],
        image: nullcover,
        liveUrl: 'https://booklister.onrender.com',
        githubUrl: 'https://github.com/Mewoabi/booklister',
        category: 'Frontend Application',
        scope: 'light',
        // accessibility: 'private'
    },
    {
        id: 10,
        title: 'Sticky Notes Application',
        description:
            'A simple frontend application where a user can create and delete sticky notes. The app features a clean design levaring material-ui components with sidebar navigation and masonary layout for the sticky notes. It demonstrates the use of React hooks for state management and local storage for data persistence.',
        technologies: ['React', 'JavaScript', 'Material-UI'],
        image: stickynotescover,
        liveUrl: 'https://noteskeeper-wswn.onrender.com',
        githubUrl: 'https://github.com/Mewoabi/NotesKeeper/tree/portfolio',
        category: 'Frontend Application',
        scope: 'light',
        // accessibility: 'private'
    },
    {
        id: 11,
        title: 'AI-Powered Loan Eligibility System',
        description:
            'A full-stack web application designed to assess loan eligibility for unbanked individuals using AI-driven credit scoring. The system accepts socio-economic and demographic data from users and uses a trained logistic regression model to determine creditworthiness. Built with a React frontend and a FastAPI backend, the application includes features such as user authentication, profile management, scoring history tracking, and real-time loan predictions. It integrates PostgreSQL for structured data storage, Prisma for ORM, and TailwindCSS for a modern, responsive UI. The system is designed to improve over time by collecting scoring outcomes and repayment records for model retraining.',
        technologies: ['React', 'TailwindCSS', 'FastAPI', 'Python', 'Scikit-learn', 'AI', 'PostgreSQL', 'Prisma'],
        image: scoresureCover, // Replace with your cover image variable
        githubUrl: 'https://github.com/Mewoabi/AI_loan_eligibility_platform', // Update with actual repo URL if available
        liveUrl: 'https://ai-loan-eligibility-platform.onrender.com/', // Add if deployed
        category: 'Fullstack Web Application',
        scope: 'heavy',
        // accessibility: 'private' // Optional
        credentials: {
            username: 'enow@gmail.com',
            password: 'doremi'
        },
    },
        {
            id: 12,
            title: 'Blockchain Crowdfunding Platform',
            description:
              'A decentralized crowdfunding platform built using Ethereum, Solidity, and React. Users authenticate via MetaMask and can create, manage, or contribute to campaigns. The platform allows users to post updates, track donations, and withdraw funds based on backer voting. Campaign data is stored securely and transparently on the Ethereum blockchain, and IPFS is used for decentralized image uploads. The app includes a user dashboard, campaign exploration, update tracking, and full transaction support via Thirdweb SDK.',
            technologies: ['React', 'Solidity', 'Ethereum', 'MetaMask', 'Thirdweb', 'IPFS', 'Blockchain', 'DApp'],
            image: nullcover, // Replace with your cover image reference
            githubUrl: 'https://github.com/Mewoabi/Blockchain_Crowdfunding', // replace with actual repo
            // liveUrl: 'https://blockchain-crowdfund-app.vercel.app/', // replace with your live link
            category: 'Fullstack DApp',
            scope: 'heavy',
            accessibility: 'public'
          }          
    // Add more projects here
];