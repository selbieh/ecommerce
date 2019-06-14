import React,{Component} from 'react';

import TopSeller from './TopSeller/TopSeller';
import NewlyLunched from './NewlyLunched/NewlyLunched';

class Home extends Component {


    render() {

        return (
            <React.Fragment>
                <TopSeller />
                <NewlyLunched />
            </React.Fragment>
            
         
        );
    }
}

export default Home;