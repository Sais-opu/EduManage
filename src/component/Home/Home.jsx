import React from 'react';
import Banner from './Banner';
import PartnerSection from './PartnerSection';
import HighlightClasses from './HighlightClasses';
import StatisticsSection from './StatisticsSection';
import FeedbackSection from './FeedbackSection';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <PartnerSection></PartnerSection>
            </div>
            <div>
                <HighlightClasses></HighlightClasses>
            </div>
            <div>
                <StatisticsSection></StatisticsSection>
            </div>
            <div>
                <FeedbackSection></FeedbackSection>
            </div>
        </div>
    );
};

export default Home;