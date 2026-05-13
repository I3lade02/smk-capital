import { Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { BlogPage } from '../pages/BlogPage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { ServicesPage } from '../pages/ServicesPage';
import { WhyUsPage } from '../pages/WhyUsPage';

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sluzby' element={<ServicesPage />} />
            <Route path='/o-nas' element={<AboutPage />} />
            <Route path='/proc-my' element={<WhyUsPage />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/kontakt' element={<ContactPage />} />
        </Routes>
    );
}