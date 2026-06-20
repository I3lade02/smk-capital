import { Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { CarInsurancePage } from '../pages/CarInsurancePage';
import { ContractReviewPage } from '../pages/ContractReviewPage';
import { HomePage } from '../pages/HomePage';
import { MortgageCalculationPage } from '../pages/MortgageCalculationPage';
import { NotFoundPage } from '../pages/not-found';
import { ServicesPage } from '../pages/ServicesPage';

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sluzby' element={<ServicesPage />} />
            <Route path='/revize-smluv' element={<ContractReviewPage />} />
            <Route path='/autopojisteni' element={<CarInsurancePage />} />
            <Route path='/hypoteka-propocet' element={<MortgageCalculationPage />} />
            <Route path='/o-nas' element={<AboutPage />} />
            <Route path='/nenalezeno' element={<NotFoundPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
