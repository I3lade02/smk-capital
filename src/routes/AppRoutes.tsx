import { Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { CarInsurancePage } from '../pages/CarInsurancePage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { MortgageCalculationPage } from '../pages/MortgageCalculationPage';
import { ServicesPage } from '../pages/ServicesPage';
import { WhyUsPage } from '../pages/WhyUsPage';

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sluzby' element={<ServicesPage />} />
            <Route path='/autopojisteni' element={<CarInsurancePage />} />
            <Route path='/hypoteka-propocet' element={<MortgageCalculationPage />} />
            <Route path='/o-nas' element={<AboutPage />} />
            <Route path='/proc-my' element={<WhyUsPage />} />
            <Route path='/kontakt' element={<ContactPage />} />
        </Routes>
    );
}
